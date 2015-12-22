'use strict';

var uPlaylist =  uPlaylist || {};   // our app's namespace

//really need a better place to put this, I can look into it later
uPlaylist.api_key = 'AIzaSyAILBP5kYFfluEpZReamdHDFM68dtLEWro';
uPlaylist.api_URL_base = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=49&playlistId=';

uPlaylist.Playlist = Backbone.Model.extend({

  defaults: {
    idAttribute : "_id",
    name: "",
    num_songs: 0.0,
    link : "",
    playlist_id: "",
    next_page_token: undefined,
    songs: new Array()
  },

  validateFunction: function(){
    var input = this.attributes.link;
    var valid_youtube_link = input.search('www.youtube.com/');
    var valid_playlist_link = input.search('list=');
    var is_currently_playing = input.search('watch');

    if(valid_youtube_link == (-1) || valid_playlist_link == (-1)){
      return {isValid: false, message: 'Link must be a youtube link with a valid playlist ID'};
    } else {
      //setting the id of the playlist to be the id of the youtube playlist
      this.attributes.playlist_id = this.attributes.link.split("list=")[1].split("&")[0];
      return {isValid: true};
    }
  },
  getData: function(){

    //request is built here, api request has to be in a separate function because
    // it may need to be called multiple times and is asynchronous
    var request = uPlaylist.api_URL_base.concat(this.attributes.playlist_id).concat('&key=').concat(uPlaylist.api_key);
    this.apiCall(request, []);
  },

  apiCall: function(request, cumulative_data){
    var self = this;

    //if there are more pages to get, alter the request
    if(self.next_page_token != undefined){
      if(request.search('&pageToken=') == (-1)){
        request = request.concat('&pageToken=').concat(self.next_page_token);
      } else {
        request = request.split('&pageToken=')[0].concat('&pageToken=' + self.next_page_token);
      }
    }

    //get the data from the api
    $.ajax({
      async    : true,
      url      : request,
      type     : 'GET',
      success  : function(data) {
        cumulative_data.push(data.items);
        self.next_page_token = data.nextPageToken;

        if(self.next_page_token != undefined){
          self.apiCall(request, cumulative_data);
        } else {
          //flattens all of the data gathered into one array
          var all_data = [].concat.apply([], cumulative_data);
          self.parseData(all_data);
          //parse all the data gathered.
          $('body').switchClass("loading", "loaded");
          $('input').css("z-index", "0");
        }
      },
      error : function(){
        //send them back to the home screen
        //************************** POTENTIALLY DELETE THE MODEL HERE **************************
        alert("Apologies, your playlist does not appear to exist");
        uPlaylist.app.navigate('#', {replace:true, trigger:true});
        $('body').switchClass("loading", "loaded");
        $('input').css("z-index", "0");
      }
    });
  },
  parseData: function(data){

    //self used to avoid code hoisting
    var self = this;
    var song;
    var position = 0;
    var song_array = new Array();
    var api_song_data = new Array();
    var id_string = "";

    $.each(data, function (key, val){
      //need to see if the video has been made private, or removed
      if((val.snippet.title != "Private video") && (val.snippet.title != "Deleted video")){
        song = new uPlaylist.Song();

        //setting the model attributes
        song.set('title', val.snippet.title);
        song.set('thumbnail', val.snippet.thumbnails.default.url);
        song.set('song_id', val.snippet.resourceId.videoId);
        song.set('position', position++);

        //used to get the runtimes from YouTube's API
        id_string += val.snippet.resourceId.videoId + '%2C+';

        //api can only take 50 things at a time, so flush the data on the 50th
        if(position % 49 == 0){
          api_song_data.push(id_string);
          id_string = "";
        }
        song_array.push(song);
      }
    });

    //final flush if there is still data in the id_string
    if(id_string != "")
      api_song_data.push(id_string);

    //get the runtimes which requires it's own API request. reverse, so i can use pop
    this.getRunTimes(song_array, api_song_data.reverse(), 0);
  },

  //used to get the runtimes of each video in the playlist
  getRunTimes: function(song_array, id_array, offset){

    //this is the last stage in the information gathering, so we persist the model here
    if(id_array.length == 0){
      this.save({songs: song_array}, {
        success: function(){
          $.event.trigger({
          	type: "finished_with_data"
          });
        },
        error: function(){
          alert("something wrong with your session storage");
        }
      });
      return;
    }

    //we have to call this function recursively in it's own callback because The
    // ajax component is obviously asynchronouse. I keep track of the song position
    //  by increasing the offset every time we call this.

    var self = this;
    var baseURL = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=';
    var requestURL = baseURL.concat(id_array.pop()).concat('&key=').concat(uPlaylist.api_key);

    //variable used to assign the runtime to the song
    var i = 49 * offset;

    $.ajax({
      async    : true,
      url      : requestURL,
      type     : 'GET',
      success  : function(data) {
        //go through each of the returned values
        $.each(data.items, function(key, val){
            var seconds, minutes = 0;
            var timeReturned = val.contentDetails.duration;

            //if it is a minute or longer, use this, otherwise use the other method
            if(timeReturned.search('M') != -1){
              minutes        = timeReturned.split("PT")[1].split('M')[0];
              if(timeReturned.search('S') != -1){
                seconds      = parseInt(timeReturned.split("M")[1].split('S')[0]);
              }
            } else {
              seconds        = parseInt(timeReturned.split("PT")[1].split('S')[0]);
            }

            //this can break the parsing if not caught here
            if(seconds == undefined)
              seconds = 0;

            //formats the seconds to always have at least 2 digits
            if(seconds < 10)
              seconds = '0' + seconds;

            //set the song attributes
            song_array[i].set('minutes', minutes);
            song_array[i++].set('seconds', seconds);
        });

        //call this function again with the offset to set the times of the later videos
        self.getRunTimes(song_array, id_array, offset+1);
      }
    });
  }
});
