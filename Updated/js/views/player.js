"use strict";

var uPlaylist =  uPlaylist || {};

uPlaylist.Player = Backbone.View.extend({

  template: _.template("../../tpl/Player.html"),

  //render the view
  render: function () {

    var self = this;
    if(uPlaylist.player == undefined){
      //renders the template
      self.$el.html(self.template());

      var imported = document.createElement('script');
      imported.src = 'js/youtube_api.js';
      document.getElementsByTagName('body')[0].appendChild(imported);

      return self;
    } else {

      //renders the template
      self.$el.html(self.template());

      console.log(self.$el);
      $('#content').append(self.$el);

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
