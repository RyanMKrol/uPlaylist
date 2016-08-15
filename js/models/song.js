'use strict';

var uPlaylist =  uPlaylist || {};

uPlaylist.Song = Backbone.Model.extend({

    idAttribute: "_id",

    //schema for a song model
    defaults: {
      title     : "",
      minutes   : 0,
      seconds   : 0,
      thumbnail : "",
      position  : 0.0,
      song_id   : ""
   }

});
