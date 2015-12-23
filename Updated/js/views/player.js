"use strict";

var uPlaylist =  uPlaylist || {};

uPlaylist.Player = Backbone.View.extend({

  template: _.template("../../tpl/Player.html"),

  //render the view
  render: function () {

    //renders the template
    this.$el.html(this.template());

    //creates the youtube player
    this.createPlayer();

    return this;
  },

  createPlayer: function(){
    var self = this;
    console.log("creating the player");
    uPlaylist.player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'qACVIch8bVM',
      playerVars: { 'controls': 1, 'modestbranding': 0, 'showinfo': 1, 'autoplay': 1 },
      events: {
        'onReady': self.onPlayerReady,
        'onStateChange': self.onPlayerStateChange
      }
    });
    console.log(uPlaylist.player);
  },

  onPlayerReady: function(event){
    conosle.log("player ready");
  },
  onPlayerStateChange: function(event){
    // when a video ends
    if(event.data === 0) {
      console.log("video ended");
    }
  }
  //player.loadVideoById(videoIDs[index], 0);
});
