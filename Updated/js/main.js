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
    this.playlistCollection = new uPlaylist.Playlists();
    this.playlistCollection.fetch();
  },

  home: function() {
    console.log("back home");
    var playlistModel = new uPlaylist.Playlist();
    //makes the new collection if one doesn't exist
    if(!this.playlistCollection){
      this.playlistCollection = new uPlaylist.Playlists();
    }
    //making the view with the model and collection
    this.homeView = new uPlaylist.Home({model : playlistModel, collection: this.playlistCollection});
    $('#content').html(this.homeView.render().el);
  },
  list: function(id){

    var self = this;

    //start the loading animation
    $('body').switchClass("loaded", "loading");
    $('input').css("z-index", "0");

    var playlistModel;
    if(!self.playlistCollection){
      self.playlistCollection = new uPlaylist.Playlists();
    }

    //get the playlist we want from the collection
    playlistModel = self.playlistCollection.get(id);

    //if it does not exist, go back home
    if(playlistModel == undefined){
      //timeout is for the loading animation to finish
      setTimeout(function(){
        alert("Sorry you have not used this playlist before");
        uPlaylist.app.navigate('#', {replace:true, trigger:true});
      }, 1000);

    } else {
      setTimeout(function(){

        //******************CURRENT PROBLEM WITH THIS METHOD******************
        //if we only ever check to see if the length equal to 0 to get the data
        //then if the user loads their playlist and then adds a song, and then
        //loads it again, we won't get that new song. Need to think of a way around
        //this. maybe do it in the background

        //i use an event handler here to know when to continue
        $(document).on("finished_with_data", function(){
          //make the list view, then render it
          if(!self.listView){
            self.listView = new uPlaylist.ListView({model : playlistModel});
          }
          $('#content').html(self.listView.render().el);
          $('body').switchClass("loading", "loaded");
          $('input').css("z-index", "0");
        });

        $(document).on("error_with_data", function(){
          alert("There was a problem somewhere, please try again.");
          uPlaylist.app.navigate('#', {replace:true, trigger:true});
          $('body').switchClass("loading", "loaded");
          $('input').css("z-index", "0");
        });

        //check to see if the songs have been gotten previously
        if(playlistModel.attributes.songs.length == 0 || playlistModel.attributes.needs_updating == 1){
          console.log("we're going to update the playlist");
          playlistModel.getData();
        } else {
          console.log("don't need to update the playlist just now");
          playlistModel.checkIfUpdateNeeded();
        }
      }, 1000);
    }
  }
});

// Load HTML templates for Home, Header, About views, and when
// template loading is complete, instantiate a Backbone router
// with history.
uPlaylist.utils.loadTemplates(['Home', 'ListItem', 'ListView'], function() {
  uPlaylist.app = new uPlaylist.AppRouter();
  Backbone.history.start();
});
