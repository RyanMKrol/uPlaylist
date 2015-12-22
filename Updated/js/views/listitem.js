"use strict";

var uPlaylist =  uPlaylist || {};
uPlaylist.ListItem = Backbone.View.extend({

  template: _.template("../../tpl/ListItem.html"),
  render: function () {
    var self = this;
    console.log(self.model);
    console.log(self.$el.html(self.template(self.model)));
    self.$el.html(self.template(self.model));
    return self;
  }
});
