// catch simple errors
"use strict";

// declare uPlaylist-app namespace if it doesn't already exist
var uPlaylist =  uPlaylist || {};

// Define Backbone router
uPlaylist.AppRouter = Backbone.Router.extend({

  // Map "URL paths" to "router functions"
  routes: {
      "": "home",
      ":id" : "list"
  },

  // When an instance of an AppRouter is declared, create a Header view
  initialize: function() {
  },

  home: function() {
    var detailsModel = new uPlaylist.Playlist();
    //makes the new collection if one doesn't exist
    if(!this.movieCollection){
      this.movieCollection = new uPlaylist.Playlists();
    }
    //making the view with the model and collection
    this.homeView = new uPlaylist.Home({model : detailsModel, collection: this.movieCollection});
    $('#content').html(this.homeView.render().el);
  },
  list: function(){
    $('body').switchClass("loaded", "loading");
    $('input').css("z-index", "0");
    setTimeout(function(){

      // do some data parsing here, maybe setup the list view and get that to
      //  do the computation
      $('body').switchClass("loading", "loaded");
      $('input').css("z-index", "0");
    }, 1000);
  }
});

// Load HTML templates for Home, Header, About views, and when
// template loading is complete, instantiate a Backbone router
// with history.
uPlaylist.utils.loadTemplates(['Home'], function() {
  uPlaylist.app = new uPlaylist.AppRouter();
  Backbone.history.start();
});
