"use strict";

var uPlaylist = uPlaylist || {};

uPlaylist.utils = {

    // Asynchronously load templates located in separate .html files using
    // jQuery "deferred" mechanism, an implementation of Promises.  Note we
    // depend on template file names matching corresponding View file names,
    // e.g. HomeView.html and home.js which defines Backbone View HomeView.
    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (uPlaylist[view]) {  // uPlaylist[view] is defined as a Backbone View
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
            		    // uPlaylist[view].prototype.template is a template function
                    uPlaylist[view].prototype.template = _.template(data);
                }));
            } else {
            		// if you see this alert when loading your app, it usually
            		// means you've got a syntax error in the named Backbone View
                alert(view + " not found");
            }
        });

        // all the deferreds have completed, now invoke the callback (function)
        $.when.apply(null, deferreds).done(callback);
    }
};
