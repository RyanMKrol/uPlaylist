'use strict';

var uPlaylist =  uPlaylist || {};

uPlaylist.Song = Backbone.Model.extend({

    idAttribute: "_id",	// to match localStorage, which uses _id rather than id

    initialize: function() {

    },

    defaults: {
      title     : "",
      runtime   : 0.0,
      thumbnail : "",
      position  : 0.0,
      song_id   : ""
   }

});
