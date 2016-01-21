"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.AvailablePlaylistsContent = Backbone.View.extend({

  //template associated with the view
  template: _.template("../../tpl/AvailablePlaylistsContent.html"),

  className: 'playlist_navigation',

  events: {
      "click #tab": "revealList",
      "click a" : "changeCurrent"
  },

  // this behaviour is just for when the user immediately clicks the button
  //  it will be done again inside main when this view is recreated
  changeCurrent: function(event){

    // changes all list items to not be current as there can be only one ;)
    $('#playlistsAvailableContent li').removeClass('current');

    // sets the element clicked to be the current playlist
    $(event.target).parent().addClass('current');
  },

  revealList: function(){
    $('.playlist_navigation').toggleClass('revealed');
  },

  //renders the view
  render: function () {

    //to avoid scoping issues
    var self = this;

    //rendering self view
    self.$el.html(self.template());

    //holds each item to be added to the view
    var item;

    // goes through each of the models and makes a playlist item for the list
    $.each(self.collection.models, function (key, val){
      item = new uPlaylist.AvailablePlaylistContent({model: val});
      self.$('#playlistsAvailableContent').append(item.render().el);
    });
    return self;
  }
});
