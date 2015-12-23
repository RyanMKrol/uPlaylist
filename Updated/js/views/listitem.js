"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.ListItem = Backbone.View.extend({

  //template associated with the view
  template: _.template("../../tpl/ListItem.html"),

  //renders the view
  render: function () {

    //render the template with the associated model
    this.$el.html(this.template(this.model));

    //return this template
    return this;
  }
});
