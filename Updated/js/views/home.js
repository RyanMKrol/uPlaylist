"use strict";

var uPlaylist =  uPlaylist || {};

//really need a better place to put this, I can look into it later
uPlaylist.api_key = 'AIzaSyAILBP5kYFfluEpZReamdHDFM68dtLEWro';
uPlaylist.api_URL_base = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=49&playlistId=';

uPlaylist.Home = Backbone.View.extend({

  events: {
      "submit form": "submit"
  },

  submit: function(event) {

    event.preventDefault();

    var input = event.target[0].value;
    var self = this;

    this.model.set({link: event.target[0].value});

    var check = this.model.validate();
    if(!check.isValid){
      uPlaylist.utils.addValidationError("link", check.message);
      return false;
    } else {
      uPlaylist.utils.removeValidationError("link");

      //starts the loading animation
      $('body').switchClass("loaded", "loading");
      $('input').css("z-index", "0");
      this.savePlaylist();
      //waits for the animation on the loading to finish and then continues
      // setTimeout(function(){
      //     self.parseData();
      // }, 1000);
    }
  },

  savePlaylist: function() {
    var newMovie = this.model.isNew();
    console.log("about to call");
    // this.collection.create( this.model, {
    //   wait: true,
    //   success: function(model, response) {
    //     // later, we'll navigate to the browse view upon success
    //     console.log("doing something");
    //     movieApp.app.navigate('#'+ model.id, {replace:true, trigger:true});
    //     console.log("we've moved");
    //   },
    //   error: function(model, response) {
    //     console.log("you messed up son");
    //   }
    // });
    this.model.save();
    this.model.save( null, {
      wait: true,
      success: function(model, response) {
        // later, we'll navigate to the browse view upon success
        console.log("doing something");
        movieApp.app.navigate('#'+ model.id, {replace:true, trigger:true});
        console.log("we've moved");
      },
      error: function(model, response) {
        console.log("you messed up son");
      }
    });

  },
  parseData: function(){
    //building up the URL to use with the API
    var request_URL = uPlaylist.api_URL_base.concat(new String(this.model.id)).concat('&key=').concat(uPlaylist.api_key);
    console.log("parsing some data yo");
  },

  render: function () {
    this.$el.html(this.template());  // create DOM content for Home
    return this;    // support chaining
  }
});
