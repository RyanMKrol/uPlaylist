"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.AvailablePlaylistsContent = Backbone.View.extend({

  //template associated with the view
  template: _.template("../../tpl/AvailablePlaylistsContent.html"),

  //renders the view
  render: function () {

    //to avoid scoping issues
    var self = this;

    //rendering self view
    self.$el.html(self.template());

    //holds each item to be added to the view
    var item;

    $.each(self.collection.models, function (key, val){
      item = new uPlaylist.AvailablePlaylistContent({model: val});
      self.$('#playlistsAvailableContent').append(item.render().el);
    });

    return self;
  }
});
