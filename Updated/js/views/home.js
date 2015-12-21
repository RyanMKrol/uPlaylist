"use strict";

var uPlaylist =  uPlaylist || {};

//really need a better place to put this, I can look into it later
uPlaylist.api_key = 'AIzaSyAILBP5kYFfluEpZReamdHDFM68dtLEWro';
uPlaylist.api_URL_base = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=49&playlistId=';

uPlaylist.Home = Backbone.View.extend({

  template: _.template("../../tpl/Home.html"),

  events: {
      "submit form": "submit"
  },

  submit: function(event) {

    event.preventDefault();

    var input = event.target[0].value;
    var self = this;

    this.model.set({link: event.target[0].value});

    var check = this.model.validateFunction();
    if(!check.isValid){
      uPlaylist.utils.addValidationError("link", check.message);
      return false;
    } else {
      uPlaylist.utils.removeValidationError("link");
      this.savePlaylist();
    }
  },

  savePlaylist: function() {
    this.collection.create( this.model, {
      wait: true,
      success: function(model, response) {
        // later, we'll navigate to the browse view upon success
        uPlaylist.app.navigate('#'+model.id, {replace:true, trigger:true});
      },
      error: function(model, response) {
        alert("playlist could not persist");
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
