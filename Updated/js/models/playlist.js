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
    next_page_token: undefined
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
  parseData: function(){
    var request = uPlaylist.api_URL_base.concat(this.attributes.playlist_id).concat('&key=').concat(uPlaylist.api_key);
    this.apiCall(request);
  },
  apiCall: function(request){
    var self = this;
    if(self.next_page_token != undefined){
      //if this is the first page token, then just concatenate it, otherwise replace it
      if(request.search('&pageToken=') == (-1)){
        request = request.concat('&pageToken=').concat(self.next_page_token);
      } else {
        request = request.split('&pageToken=')[0].concat(self.next_page_token);
      }
    }
    $.ajax({
      //stops the other events on the page from firing
      async    : true,
      //the URL is what we built up earlier
      url      : request,
      // the method of ajax i'm using is get
      type     : 'GET',
      // the function that will be carried out on success
      success  : function(data) {
          console.log(data.nextPageToken);
          self.next_page_token = data.nextPageToken;
          if(self.next_page_token != undefined){
            console.log("going into the next call");
            self.apiCall(request);
          } else {
            $('body').switchClass("loading", "loaded");
            $('input').css("z-index", "0");
          }
          // parseAllTheData(data);
      },
      error : function(){
        alert("Apologies, your playlist does not appear to exist");
        $('body').switchClass("loading", "loaded");
        $('input').css("z-index", "0");
      }
    });
  }
});
