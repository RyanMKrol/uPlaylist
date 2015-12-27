"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.AvailablePlaylist = Backbone.View.extend({

  //template associated with the view
  template: _.template("../../tpl/AvailablePlaylist.html"),

  //renders the view
  render: function () {

    //render the template with the associated model
    this.$el.html(this.template(this.model.toJSON()));

    //return this template
    return this;
  }
});
