"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.ListView = Backbone.View.extend({

  render: function () {
    this.$el.html(this.template());  // create DOM content for Home
    return this;    // support chaining
  }
});
