"use strict";

var uPlaylist =  uPlaylist || {};

uPlaylist.Home = Backbone.View.extend({

  template: _.template("../../tpl/Home.html"),

  events: {
      "submit form": "submit"
  },

  submit: function(event) {

    //stop the page from refreshing/redirecting
    event.preventDefault();

    //get the value of what was input
    var input = event.target[0].value;
    var self = this;

    //update the model to reflect the input
    this.model.set({link: event.target[0].value});

    //validate the input
    var check = this.model.validateFunction();

    //check to see if the input is valid
    if(!check.isValid){
      uPlaylist.utils.addValidationError("link", check.message);
      return false;
    } else {
      uPlaylist.utils.removeValidationError("link");
      this.savePlaylist();
    }
  },

  //persist the model with the storage mechanism
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

  //render the view
  render: function () {
    this.$el.html(this.template());  // create DOM content for Home
    return this;    // support chaining
  }
});
