'use strict';

var uPlaylist =  uPlaylist || {};

uPlaylist.Songs = Backbone.Collection.extend({

    //model that the collection uses
    model : uPlaylist.Song,

    //storage method used by backbone
    localStorage: new Backbone.LocalStorage('uPlaylist'),

    //function called when model created
    initialize: function(){
      this.fetch();
    }
});
