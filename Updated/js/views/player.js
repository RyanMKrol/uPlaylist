"use strict";

var uPlaylist =  uPlaylist || {};

uPlaylist.Player = Backbone.View.extend({

  template: _.template("../../tpl/Player.html"),

  //render the view
  render: function () {

    //renders the template
    this.$el.html(this.template());

    var imported = document.createElement('script');
    imported.src = 'js/youtube_api.js';
    document.getElementsByTagName('body')[0].appendChild(imported);

    //creates the youtube player
    // this.createPlayer();

    return this;
  },
  //player.loadVideoById(videoIDs[index], 0);
});
