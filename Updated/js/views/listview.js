"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.ListView = Backbone.View.extend({

  template: _.template("../../tpl/ListView.html"),
  render: function () {

    //going through the songs and making a view for each of them
    for (var i = 0; i < this.model.attributes.songs.length; i++) {
      this.playlistItem = new uPlaylist.ListItem({model: this.model.attributes.songs[i]});
      this.$el.append(this.playlistItem.render().el);
    }

    //rendering this view
    // this.$el.html(this.template());
    return this;
  }
});
