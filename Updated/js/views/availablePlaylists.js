"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.AvailablePlaylists = Backbone.View.extend({

  //template associated with the view
  template: _.template("../../tpl/AvailablePlaylists.html"),

  //renders the view
  render: function () {

    //to avoid scoping issues
    var self = this;
    //rendering self view
    self.$el.html(self.template());

    console.log(self.collection);

    $.each(self.collection.models, function (key, val){
      console.log(val);
      self.availablePlaylist = new uPlaylist.AvailablePlaylist({model: val});
      self.$('#playlistsAvailable').append(self.availablePlaylist.render().el);
    });

    //going through the songs and making a view for each of them
    // for (var i = 0; i < self.model.attributes.songs.length; i++) {
    //   self.playlistItem = new uPlaylist.ListItem({model: self.model.attributes.songs[i]});
    //   self.$('#listContent').append(self.playlistItem.render().el);
    // }

    return self;
  }
});
