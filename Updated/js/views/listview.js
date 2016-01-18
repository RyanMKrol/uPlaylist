"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.ListView = Backbone.View.extend({

  //template associated with the view
  template: _.template("../../tpl/ListView.html"),
  className: 'list_holder',

  events: {
      "click button": "hidePlayer"
  },

  // switches up the visibility css
  hidePlayer : function(){

    if($('#player_holder').css('visibility') === 'hidden'){
      $('#player_holder').css('visibility', 'visible');
    } else {
      $('#player_holder').css('visibility', 'hidden');
    }
  },

  //renders the view
  render: function () {

    //rendering this view
    this.$el.html(this.template());

    //going through the songs and making a view for each of them
    for (var i = 0; i < this.model.attributes.songs.length; i++) {
      this.playlistItem = new uPlaylist.ListItem({model: this.model.attributes.songs[i]});
      this.$('#listContent').append(this.playlistItem.render().el);
    }

    setSortable();

    return this;
  }
});
