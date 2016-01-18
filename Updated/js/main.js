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
    uPlaylist.playlistCollection = new uPlaylist.Playlists();
    uPlaylist.playlistCollection.fetch();
  },

  home: function() {

    //make a brand new playlist object
    var playlistModel = new uPlaylist.Playlist();

    //makes the new collection if one doesn't exist
    if(!uPlaylist.playlistCollection){
      uPlaylist.playlistCollection = new uPlaylist.Playlists();
    }

    //making the view with the model and collection
    this.homeView = new uPlaylist.Home({model : playlistModel, collection: uPlaylist.playlistCollection});
    $('#content').html(this.homeView.render().el);

    this.availablePlaylistsHomeView = new uPlaylist.AvailablePlaylistsHome({collection: uPlaylist.playlistCollection});
    $('#content').append(this.availablePlaylistsHomeView.render().el);
  },
  list: function(id){

    //used to avoid scoping issues
    var self = this;

    //start the loading animation
    $('body').switchClass("loaded", "loading");
    $('#loader-wrapper').css('pointer-events', 'all');

    //get the model and playlist
    var playlistModel;
    if(!uPlaylist.playlistCollection){
      uPlaylist.playlistCollection = new uPlaylist.Playlists();
    }

    //get the playlist we want from the collection
    playlistModel = uPlaylist.playlistCollection.get(id);

    //set the current playlist, used for the video player
    uPlaylist.currentPlaylist = playlistModel;

    $(document).one("transition_finish", function(){

      //if the playlist is undefined, the user does not have this in their localstorage
      if(playlistModel == undefined){

        //alert the user of the problem
        alert("Sorry you have not used this playlist before");

        //handle the 'problem' event
        $(document).trigger("error_with_data");
      } else {

        //this has to be inside in order to use the playlistModel created earlier
        $(document).one("finished_with_data", function(event){

          //make the list view, then render it
          self.listView = new uPlaylist.ListView({model : playlistModel});
          $('#content').html(self.listView.render().el);

          //make the list view, then render it
          self.availablePlaylistsContentView = new uPlaylist.AvailablePlaylistsContent({collection : uPlaylist.playlistCollection});
          $('#content').append(self.availablePlaylistsContentView.render().el);

          // makes the list reorderable
          setSortable();

          //if a playerView already exists, the appending must be done manually
          if(!self.playerView){
            self.playerView = new uPlaylist.Player();
            $('#content').append(self.playerView.render().el);
          } else {
            self.playerView = new uPlaylist.Player();
            self.playerView.render();
          }
        });

        //check to see if the songs have been gotten previously
        if(playlistModel.attributes.songs.length == 0 || playlistModel.attributes.needs_updating == 1){

          console.log("getting data");
          //get the data for the playlist
          playlistModel.getData();
        } else {

          console.log("not getting data");
          //the check is done asynchronously in the background, so we can finish here
          $(document).trigger("finished_with_data");
          //check to see if we need to update the playlist the next time
          playlistModel.checkIfUpdateNeeded();
        }
      }
    });
  }
});

//load the templates
uPlaylist.utils.loadTemplates([
  'Home',
  'AvailablePlaylistHome',
  'AvailablePlaylistsHome',
  'AvailablePlaylistContent',
  'AvailablePlaylistsContent',
  'ListItem',
  'ListView',
  'Player'
], function() {
  uPlaylist.app = new uPlaylist.AppRouter();
  Backbone.history.start();
});

/*  EVENT HANDLERS  */
//used to listen for the end of the loading animation
$("#transition_listener").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(event){

  if(event.originalEvent.propertyName == 'transform' && $('#loader-wrapper').css('pointer-events') == 'all'){
    $(document).trigger("transition_finish");
  }
});

//triggered when the system fails to get playlist data
$(document).on("error_with_data", function(){

  //go back to the home page and remove the loading div
  uPlaylist.app.navigate('#', {replace:true, trigger:true});

  //remove the loader
  $(document).trigger("remove_loader");
});

//loading is only removed for legit requests when the player is loaded
$(document).on("finished_loading_player", function(){

  //remove the loader
  $(document).trigger("remove_loader");
});

//having a separate event for specifically removing the loader, it's reused a lot
$(document).on("remove_loader", function(){

  //remove the loading animation
  $('body').switchClass("loading", "loaded");
  $('#loader-wrapper').css('pointer-events', 'none');

});
