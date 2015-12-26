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

    //make a brand new playlist object
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
    $('#loader-wrapper').css('pointer-events', 'all');

    //get the model and playlist
    var playlistModel;
    if(!self.playlistCollection){
      self.playlistCollection = new uPlaylist.Playlists();
    }

    //get the playlist we want from the collection
    playlistModel = self.playlistCollection.get(id);
    uPlaylist.currentPlaylist = playlistModel;

    $(document).one("transition_finish", function(){

      if(playlistModel == undefined){

        //alert the user of the problem
        alert("Sorry you have not used this playlist before");

        //handle the 'problem' event
        $(document).trigger("error_with_data");
      } else {

        //this has to be inside in order to use the playlistModel created earlier
        $(document).on("finished_with_data", function(){
          //make the list view, then render it
          if(!self.listView){
            self.listView = new uPlaylist.ListView({model : playlistModel});
          }
          $('#content').html(self.listView.render().el);

          if(!self.playerView){
            self.playerView = new uPlaylist.Player();
          }

          $('#content').append(self.playerView.render().el);

          //removes the loading animation
          $('body').switchClass("loading", "loaded");
          $('#loader-wrapper').css('pointer-events', 'none');
        });

        //check to see if the songs have been gotten previously
        if(playlistModel.attributes.songs.length == 0 || playlistModel.attributes.needs_updating == 1){

          //get the data for the playlist
          playlistModel.getData();
        } else {
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
uPlaylist.utils.loadTemplates(['Home', 'ListItem', 'ListView', 'Player'], function() {
  uPlaylist.app = new uPlaylist.AppRouter();
  Backbone.history.start();
});

/*  EVENT HANDLERS  */

//used to listen for the end of the loading animation
$("#transition_listener").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){

  //this will call twice when the loading div closes and opens, this ensures that i
  // only trigger the event once
  if($('#loader-wrapper').css('pointer-events') == 'all'){
    $(document).trigger("transition_finish");
  }
});

//triggered when the system fails to get playlist data
$(document).on("error_with_data", function(){

  //go back to the home page and remove the loading div
  uPlaylist.app.navigate('#', {replace:true, trigger:true});
  $('body').switchClass("loading", "loaded");
  $('#loader-wrapper').css('pointer-events', 'none');
});
