'use strict';

var uPlaylist =  uPlaylist || {};   // our app's namespace

uPlaylist.Playlist = Backbone.Model.extend({

  defaults: {
    idAttribute : "_id",
    name: "",
    num_songs: 0.0,
    link : "",
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
      this.id = this.attributes.link.split("list=")[1].split("&")[0];
      return {isValid: true};
    }
  }
});
