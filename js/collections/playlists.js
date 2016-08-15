"use strict";

var uPlaylist =  uPlaylist || {};

uPlaylist.Playlists = Backbone.Collection.extend({

  //model that the collection uses
  model: uPlaylist.Playlist,

  //local storage used by the collection
  localStorage: new Backbone.LocalStorage('uPlaylist'),

  //when created, sync the model with the storage mechanism
  initialize: function(){
    this.fetch();
  }
});
