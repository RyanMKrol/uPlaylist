// catch simple errors
"use strict";

// declare uPlaylist-app namespace if it doesn't already exist
var uPlaylist =  uPlaylist || {};

//When you create a Movies collection, you can populate it with saved data from
// localStorage using the collection fetch() method.

uPlaylist.Playlists = Backbone.Collection.extend({
  // identify collection’s model
  model: uPlaylist.Playlist,
  // save movie models in localStorage under "uPlaylist" namespace
  localStorage: new Backbone.LocalStorage('uPlaylist'),
  initialize: function(){
    this.fetch();
  }
});
