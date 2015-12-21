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
        return {isValid: true};
      }

      // //if the search is invalid '-1' will be returned and the user should be alerted
      // if( (youtubeCheck == (-1)) || (playlistCheck == (-1)) ){
      //     alert("The playlist must be from YouTube and have a playlist ID, i.e. this will not work on your history.\n An example URL would be: https://www.youtube.com/playlist?list=PLMNUXrGDzNpA_HRobzHdGpOfSb4O2OUlB");
      //
      //     //highlights the text in the textbox
      //     highlightText(input.playlistURL);
      //     //stop the form from submitting
      //     return false;
      // } else {
      //     //if they were playing a video, find the index of the video they were playing
      //     if(currentlyPlayingCheck != (-1)){
      //         var currentIndexCheck = sessionStorage.playlistURL.search('index');
      //         //if there is an index, parse which index the video is at
      //         if(currentIndexCheck != (-1)){
      //             sessionStorage.currentlyPlaying = parseInt(splitOnTwo(sessionStorage.playlistURL, "index=", "&"));
      //         }
      //     }
      //     sessionStorage.playlistID = splitOnTwo(sessionStorage.playlistURL, "list=", "&")
      //
      //     //starts the loading animation
      //     $('body').switchClass("loaded", "loading");
      //     $('input').css("z-index", "0");
      //
      //     //waits for the animation on the loading to finish and then continues
      //     setTimeout(function(){
      //         getPlaylistData(input);
      //     }, 1000);
      //     //doesn't currently get the playlist data, this will happen once i have a loading screen in there
      //     return false;
      // }
    },

    defaults: {
      name     : "",
      num_Playlists   : 0.0,
      link : "",
   }

});
