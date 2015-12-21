'use strict';

var uPlaylist =  uPlaylist || {};   // our app's namespace

//really need a better place to put this, I can look into it later
uPlaylist.api_key = 'AIzaSyAILBP5kYFfluEpZReamdHDFM68dtLEWro';
uPlaylist.api_URL_base = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=49&playlistId=';

uPlaylist.Playlist = Backbone.Model.extend({

  initialize: function() {
    // if(!this.songs){
    //   this.songs = new Array();
    // }
  },
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
    var request = uPlaylist.api_URL_base.concat(this.attributes.playlist_id).concat('&key=').concat(uPlaylist.api_key);
    this.apiCall(request, []);
  },

  apiCall: function(request, cumulative_data){
    var self = this;
    console.log(cumulative_data);
    console.log(request);
    console.log(self.next_page_token);
    if(self.next_page_token != undefined){
      //if this is the first page token, then just concatenate it, otherwise replace it
      if(request.search('&pageToken=') == (-1)){
        request = request.concat('&pageToken=').concat(self.next_page_token);
      } else {
        request = request.split('&pageToken=')[0].concat('&pageToken=' + self.next_page_token);
      }
    }
    console.log(request);
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
        alert("Apologies, your playlist does not appear to exist");
        $('body').switchClass("loading", "loaded");
        $('input').css("z-index", "0");
      }
    });
  },
  parseData: function(data){
    var self = this;
    var song;
    var position = 0;
    var song_array = new Array();
    $.each(data, function (key, val){
      if((val.snippet.title != "Private video") && (val.snippet.title != "Deleted video")){
        song = new uPlaylist.Song();
        // runtime   : 0.0,
        song.attributes.title = val.snippet.title;
        song.attributes.thumbnail = val.snippet.thumbnails.default.url;
        song.attributes.song_id = val.snippet.resourceId.videoId;
        song.attributes.position = position++;
        song_array.push(song);
      }
    });
    this.save({songs: song_array}, {
      success: function(){
        console.log("songs have been persisted");
      },
      error: function(){
        alert("something wrong with your session storage");
      }
    });
  }
});
