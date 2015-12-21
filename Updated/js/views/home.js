"use strict";

var uPlaylist =  uPlaylist || {};
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

      //waits for the animation on the loading to finish and then continues
      setTimeout(function(){
          self.parseData();
      }, 1000);

    }


    // uPlaylist.app.navigate('movies', {replace:true, trigger:true});
    //
    // var newMovie = this.model.isNew();
    // this.model.collection.create(this.model, {
    //   wait: true,
    //   success: function(model, response) {
    //     // Set the URL, to reflect the assigned movie-id for new movies
    //     if (newMovie) {
    //       uPlaylist.app.navigate('movies', {replace:true, trigger:true});
    //       // model.reviews.url = '/movies/' + model._id + '/reviews';
    //     };
    //     uPlaylist.utils.showAlert('Success!', 'Movie saved', 'alert-success');
    //   },
    //   error: function (model, err) {
    //     uPlaylist.utils.requestFailed(err);
    //   }
  },
  parseData: function(){
    console.log("parsing some data yo");
  },

  render: function () {
    this.$el.html(this.template());  // create DOM content for Home
    return this;    // support chaining
  }
});
