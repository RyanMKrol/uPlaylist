"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.AvailablePlaylistHome = Backbone.View.extend({

  //template associated with the view
  template: _.template("../../tpl/AvailablePlaylistHome.html"),

  //renders the view
  render: function () {

    //rendering like this ensures there is no surrounding div
    var html = this.template(this.model.toJSON());
    this.setElement(html);

    //return this template
    return this;
  }
});
