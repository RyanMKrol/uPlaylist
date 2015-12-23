'use strict';

var uPlaylist =  uPlaylist || {};   // our app's namespace

//really need a better place to put this, I can look into it later
uPlaylist.api_key = 'AIzaSyAILBP5kYFfluEpZReamdHDFM68dtLEWro';
uPlaylist.api_URL_base = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=49&playlistId=';

uPlaylist.Playlist = Backbone.Model.extend({

  //schema for a playlist
  defaults: {
    idAttribute : "_id",
    name: "",
    num_songs: 0.0,
    link : "",
    playlist_id: "",
    next_page_token: undefined,
    songs: new Array(),
    total_songs: 0,
    needs_updating: 0,
    md5_hash: ""
  },

  //some basic checking to see if the provided link is valid
  validateFunction: function(){

    //setting up the variables for the checks
    var input = this.attributes.link;
    var valid_youtube_link = input.search('www.youtube.com/');
    var valid_playlist_link = input.search('list=');
    var is_currently_playing = input.search('watch');

    //checking if the URL supplied is valid
    if(valid_youtube_link == (-1) || valid_playlist_link == (-1)){
      return {isValid: false, message: 'Link must be a youtube link with a valid playlist ID'};
    } else {

      //setting the id of the playlist to be the id of the youtube playlist
      this.attributes.playlist_id = this.attributes.link.split("list=")[1].split("&")[0];
      return {isValid: true};
    }
  },

  //starts the process for getting data from the API
  getData: function(){

    //request is built here and sent here because apiCall is recursive
    var request = uPlaylist.api_URL_base.concat(this.attributes.playlist_id).concat('&key=').concat(uPlaylist.api_key);
    this.apiCall(request, []);
  },

  //the function builds up the data recursively until there are no pages left
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

        //build up the data store and see if there is another page to get
        cumulative_data.push(data.items);
        self.next_page_token = data.nextPageToken;

        if(self.next_page_token != undefined){
          self.apiCall(request, cumulative_data);
        } else {

          //flattens all of the data gathered into one array
          var all_data = [].concat.apply([], cumulative_data);

          //resets the needs updating, and updates the total results
          self.attributes.total_songs = data.pageInfo.totalResults;
          self.attributes.needs_updating = 0;

          //parse the data and actually update the model
          self.parseData(all_data, false);
        }
      },
      error : function(){

        //alerts the user to the issue
        alert("Apologies, your playlist does not appear to exist");

        //destroys this model made in local storage if the playlist doesn't exist
        self.destroy({
          success: function(model, response) {
            console.log("destroyed self");
          }
        });

        //tells the client's we're done, and there was a problem
        $(document).trigger("error_with_data");
      }
    });
  },
  parseData: function(data, is_check){

    //self used to avoid code hoisting
    var self = this;
    var song;
    var position = 0;
    var song_array = new Array();
    var api_song_data = new Array();
    var id_string = "";
    var md5_array = new Array();

    //go through all of the data
    $.each(data, function (key, val){

      //need to see if the video has been made private, or removed
      if((val.snippet.title != "Private video") && (val.snippet.title != "Deleted video")){
        if(!is_check){
          song = new uPlaylist.Song();

          //setting the model attributes
          song.set('title', val.snippet.title);
          song.set('thumbnail', val.snippet.thumbnails.default.url);
          song.set('song_id', val.snippet.resourceId.videoId);
          song.set('position', position++);

          //used to get the runtimes from YouTube's API
          id_string += val.snippet.resourceId.videoId + '%2C+';

          //pushing each id to the md5 array for hashing later
          md5_array.push(val.snippet.resourceId.videoId);

          //api can only take 50 things at a time, so flush the data on the 50th
          if(position % 49 == 0){
            api_song_data.push(id_string);
            id_string = "";
          }

          //add individual song to songs array
          song_array.push(song);
        }

        //pushing each id to the md5 array for hashing later
        md5_array.push(val.snippet.resourceId.videoId);
      }
    });

    //final flush if there is still data in the id_string
    if(id_string != "")
      api_song_data.push(id_string);

    //i need to sort the ids to account for any change in ordering of songs The
    // user might do on youtube.
    md5_array.sort();

    //turn this array into a string
    var md5_string = md5(md5_array.join());

    //if not a check get runtimes and set hash, else return check data
    if(!is_check){
      self.md5_hash = md5(md5_string);
      this.getRunTimes(song_array, api_song_data.reverse(), 0);
    } else {
      var is_same_hash = self.attributes.md5_hash == md5_string ? 0 : 1;
      return [is_same_hash, md5_string];
    }
  },

  //used to get the runtimes of each video in the playlist
  getRunTimes: function(song_array, id_array, offset){

    //on the last stage, persist the playlist model
    if(id_array.length == 0){
      this.save({songs: song_array}, {
        success: function(){
          $.event.trigger({
          	type: "finished_with_data"
          });
        },
        error: function(){
          alert("Playlist could not be persisted in local storage, perhaps you have it turned off?");
          //tells the client's we're done, and there was a problem
          $(document).trigger("error_with_data");
        }
      });
      return;
    }

    //we call this function recursively by popping the array each time until empty
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
  },

  //have to put this outside of apiCheck because apiCheck is recursive
  checkIfUpdateNeeded: function(){
    var request = uPlaylist.api_URL_base.concat(this.attributes.playlist_id).concat('&key=').concat(uPlaylist.api_key);
    this.apiCheck(request, []);
  },

  //this is for the background checking to see if a playlist needs updating
  apiCheck: function(request, cumulative_data){
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

        //pushes all data into one array
        cumulative_data.push(data.items);

        //sees if we have another page to go to
        self.next_page_token = data.nextPageToken;

        //if we do, call this function again
        if(self.next_page_token != undefined){
          self.apiCheck(request, cumulative_data);
        } else {

          //flattens all of the data gathered into one array
          var all_data = [].concat.apply([], cumulative_data);

          //check gets the needs_updating bit, and the new hash that will be used
          var check = self.parseData(all_data, true);
          //save the model to tell the service that this needs updating next time
          self.save({needs_updating: check[0], md5_hash: check[1]}, {
            success: function(){
              console.log("model persisted");
            }
          });
        }
      }
    });
  }
});
