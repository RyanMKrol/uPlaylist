"use strict";

var uPlaylist =  uPlaylist || {};

uPlaylist.Home = Backbone.View.extend({

  //template associated with the view
  template: _.template("../../tpl/Home.html"),

  //events associated with this view
  events: {
      "submit form": "submit"
  },

  //handles when the form is submitted
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
    var self = this;
    //used to see if the model is already in local storage
    var needs_creating = true;
    //used to get the id of the model in the collection
    var navigate_to = "";

    //going through the collection to see if this model already exists
    $.each(this.collection.models, function (key, val){
      if(val.attributes.link == self.model.attributes.link){
        needs_creating = false;
        navigate_to = val.id;
        return false;
      }
    });

    //if the model doesn't exist, create it, otherwise navigate to it
    if(needs_creating){
      this.collection.create( this.model, {
        wait: true,
        success: function(model, response) {
          //navigate to a list view, #<id>
          uPlaylist.app.navigate('#'+model.id, {replace:true, trigger:true});
        },
        error: function(model, response) {
          alert("playlist could not persist");
        }
      });
    } else {
      uPlaylist.app.navigate('#' + navigate_to, {replace:true, trigger:true});
    }
  },

  //render the view
  render: function () {
    this.$el.html(this.template());  // create DOM content for Home
    return this;    // support chaining
  }
});
