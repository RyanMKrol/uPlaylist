"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.Home = Backbone.View.extend({

  events: {
      "submit form": "beforeSave"
  },

  beforeSave: function(event) {
    event.preventDefault();
    var input = event.target[0].value;

    console.log(this.model);
    this.model.set({link: event.target[0].value});
    var check = this.model.validate();


    // splat.app.navigate('movies', {replace:true, trigger:true});
    //
    // var newMovie = this.model.isNew();
    // this.model.collection.create(this.model, {
    //   wait: true,
    //   success: function(model, response) {
    //     // Set the URL, to reflect the assigned movie-id for new movies
    //     if (newMovie) {
    //       splat.app.navigate('movies', {replace:true, trigger:true});
    //       // model.reviews.url = '/movies/' + model._id + '/reviews';
    //     };
    //     splat.utils.showAlert('Success!', 'Movie saved', 'alert-success');
    //   },
    //   error: function (model, err) {
    //     splat.utils.requestFailed(err);
    //   }
  },

  render: function () {
    this.$el.html(this.template());  // create DOM content for Home
    return this;    // support chaining
  }
});
