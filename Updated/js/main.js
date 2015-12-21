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
    this.movieCollection = new uPlaylist.Playlists();
    this.movieCollection.fetch();
  },

  home: function() {
    console.log("back home");
    var playlistModel = new uPlaylist.Playlist();
    //makes the new collection if one doesn't exist
    if(!this.movieCollection){
      this.movieCollection = new uPlaylist.Playlists();
    }
    //making the view with the model and collection
    this.homeView = new uPlaylist.Home({model : playlistModel, collection: this.movieCollection});
    $('#content').html(this.homeView.render().el);
  },
  list: function(id){
    //start the loading animation
    $('body').switchClass("loaded", "loading");
    $('input').css("z-index", "0");

    var playlistModel;
    if(!this.movieCollection){
      this.movieCollection = new uPlaylist.Playlists();
    }

    //get the playlist we want from the collection
    playlistModel = this.movieCollection.get(id);

    //if it does not exist, go back home
    if(playlistModel == undefined){
      //timeout is for the loading animation to finish
      setTimeout(function(){
        alert("sorry this playlist does not exist\nbeing taken back home");
        uPlaylist.app.navigate('#', {replace:true, trigger:true});
      }, 1000);
    } else {
      setTimeout(function(){
        $('body').switchClass("loading", "loaded");
        $('input').css("z-index", "0");

        //parsing

      }, 1000);
    }
  }
});

// Load HTML templates for Home, Header, About views, and when
// template loading is complete, instantiate a Backbone router
// with history.
uPlaylist.utils.loadTemplates(['Home'], function() {
  uPlaylist.app = new uPlaylist.AppRouter();
  Backbone.history.start();
});
