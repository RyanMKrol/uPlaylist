"use strict";

var uPlaylist =  uPlaylist || {};

uPlaylist.Player = Backbone.View.extend({

  template: _.template("../../tpl/Player.html"),

  //render the view
  render: function () {

    //used to avoid scoping issues
    var self = this;

    //if there is not already a playlist, load the api and insert a player
    if(uPlaylist.player == undefined){

      //renders the template
      self.$el.html(self.template());

      //imports the new script that will cause the youtube api to load
      var imported = document.createElement('script');
      imported.src = 'js/youtube_api.js';
      document.getElementsByTagName('body')[0].appendChild(imported);

      //returns self
      return self;

    } else {

      //renders the template
      self.$el.html(self.template());

      //places the div manually, so that the YTPlayer has something to attach to
      $('#content').append(self.$el);

      //creates a new youtube player
      uPlaylist.player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: uPlaylist.currentPlaylist.attributes.songs[0].song_id,
        playerVars: {
          'controls': 1,
          'modestbranding': 1,
          'showinfo': 0,
          'autoplay': 0
        },
        events: {
          'onReady': function(){$(document).trigger("finished_loading_player");},
          'onStateChange': onPlayerStateChange
        }
      });
    }
  },
});
