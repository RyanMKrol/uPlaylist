// catch simple errors
"use strict";

// declare uPlaylist-app namespace if it doesn't already exist
var uPlaylist =  uPlaylist || {};

$("#transition_listener").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
  $(document).trigger("transition_finish");
});

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

    //get the model and playlist
    var playlistModel;
    if(!self.playlistCollection){
      self.playlistCollection = new uPlaylist.Playlists();
    }

    //get the playlist we want from the collection
    playlistModel = self.playlistCollection.get(id);

    $(document).on("transition_finish", function(){
      if(playlistModel == undefined){
        alert("Sorry you have not used this playlist before");
        uPlaylist.app.navigate('#', {replace:true, trigger:true});
      } else {
        //i use an event handler here to know when to continue
        $(document).on("finished_with_data", function(){

          //make the list view, then render it
          if(!self.listView){
            self.listView = new uPlaylist.ListView({model : playlistModel});
          }
          $('#content').html(self.listView.render().el);

          //removes the loading animation
          $('body').switchClass("loading", "loaded");
          $('input').css("z-index", "0");
        });

        //triggered when the system fails to get playlist data
        $(document).on("error_with_data", function(){
          alert("There was a problem somewhere, please try again.");

          //goes back to the home screen and removes the loading animation
          uPlaylist.app.navigate('#', {replace:true, trigger:true});
          $('body').switchClass("loading", "loaded");
          $('input').css("z-index", "0");
        });

        //check to see if the songs have been gotten previously
        if(playlistModel.attributes.songs.length == 0 || playlistModel.attributes.needs_updating == 1){

          //get the data for the playlist
          playlistModel.getData();
        } else {

          //check to see if we need to update the playlist the next time
          playlistModel.checkIfUpdateNeeded();
          $(document).trigger("finished_with_data");
        }
      }
    });
  }
});

//load the templates
uPlaylist.utils.loadTemplates(['Home', 'ListItem', 'ListView'], function() {
  uPlaylist.app = new uPlaylist.AppRouter();
  Backbone.history.start();
});
