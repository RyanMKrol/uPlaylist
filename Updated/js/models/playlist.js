'use strict';

var uPlaylist =  uPlaylist || {};

uPlaylist.Playlist = Backbone.Model.extend({

    idAttribute: "_id",	// to match localStorage, which uses _id rather than id

    model: uPlaylist.Song,

    initialize: function() {
      //backbone has issues with having properties that are arrays, apparently
      // this is how you go about it
      if( !this.get('songs') ){
        this.set({songs: new Array()});
      }
    },

    validate: function(){
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
    },

    defaults: {
      name: "",
      num_songs: 0.0,
      link : "",
   }

});
