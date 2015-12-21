'use strict';

var uPlaylist =  uPlaylist || {};

uPlaylist.AppRouter = Backbone.Router.extend({

    routes: {
        ""    : "home",
        ":id" : "movieRender"
    },

    defaultRoute: function() {
    	this.home();
    },

    initialize: function() {
      this.playlists = new uPlaylist.Playlists();
      this.playlists.fetch();
    },

    home: function() {
      var playlist = new uPlaylist.Playlist();
      var self = this;
      if (!self.homeView) {
          self.homeView = new uPlaylist.Home({model: playlist, collection: self.playlists});
      }
      uPlaylist.app.showView('#content', self.homeView);
    },

    // movieRender: function(){
    //   if(!this.listView){
    //     this.listView = new uPlaylist.ListView();
    //   }
    //   uPlaylist.app.showView('#content', this.listView);
    // },
    //
    // about: function() {
    //     if (!this.aboutView) {
    //         this.aboutView = new uPlaylist.About();
    //     };
    //     uPlaylist.app.showView('#content', this.aboutView);
    //     // hilite "About" in header
    //     this.headerView.selectMenuItem('about-menu');
    // },
    //
    // browse: function() {
    //   console.log(this.reviews);
    //   var self = this;
    //   this.moviesBrowse = this.movies.fetch();
    // 	this.moviesBrowse.done(function() {
  	//     uPlaylist.moviesView = new uPlaylist.MoviesView({collection:self.movies});
    //     uPlaylist.app.showView('#content', uPlaylist.moviesView);
    // 	});
    //   this.headerView.selectMenuItem('browse-menu');
    // },
    //
    // editMovie: function(id) {
    // 	var self = this;
    // 	this.moviesLoaded.done(function() {
  	//     self.movieView(id);
    //   });
    // 	// no menu item active at this point
    // 	this.headerView.selectMenuItem();
    // },
    //
    // addMovie: function() {
    //   var movie = new uPlaylist.Movie();  // create new Movie
    // 	// Details expects movie to have a collection
    // 	movie.collection = this.movies;
    // 	this.moviesLoaded.done(function() {
    //     var detailsView = new uPlaylist.Details({model: movie});
    //     uPlaylist.app.showView('#content', detailsView);
    // 	});
    //   this.headerView.selectMenuItem('add-menu');  // Add menu item active
    // },
    //
    // movieView: function(id) {
    //
    //     var movieModel = this.movies.get(id);  // get model from collection
    //     // display error if invalid id is provided
    //     if (!movieModel) {
    //       uPlaylist.utils.showAlert('Error', "can't find this movie (perhaps deleted?)", 'alert-danger');
    //     } else {
    //       var detailsView = new uPlaylist.Details({model: movieModel});
    //       uPlaylist.app.showView('#content', detailsView);
    //   	}
    // },
    // displayReview:function(id){
    //   var self = this;
    //   this.reviews.url = "/movies/" + id + "/reviews";
    //   var movieModel = this.movies.get(id);  // get model from collection
    //   var reviewModel = new uPlaylist.Review();  // create new Movie
    //
    //   this.movies.fetch({
    //     success : function (collection, resp){
    //       var movieModel = collection.get(id);
    //       if (!movieModel) {
    //         uPlaylist.utils.showAlert('Error', "can't find this movie (perhaps deleted?)", 'alert-danger');
    //       } else {
    //         self.reviews.fetch({
    //           success : function (collection, resp){
    //             var reviewsView = new uPlaylist.ReviewView({collection: collection, model: movieModel, reviewModel: reviewModel});
    //             uPlaylist.app.showView('#content', reviewsView);
    //           },
    //           error : function (coll, resp){
    //             console.log(resp);
    //           }
    //         });
    //       }
    //     },
    //     error : function (coll, resp){
    //       console.log(resp);
    //     }
    //   });
    // },

    /* showView invokes close() on the currentView before replacing it
       with the new view, in order to avoid memory leaks and ghost views.
       Note that for composite views (views with subviews), must make sure
       to close “child” views when the parent is closed.  The parent view
       should keep track of its child views so it can call their respective
       close() methods when its own close() method is invoked. The
       beforeClose() method (explained above) of the parent View is a good
       place to close child Views. */
    showView: function(selector, view) {
        if (this.currentView) {
            this.currentView.close();
      	}
        $(selector).html(view.render().el);
        return this.currentView;
    }

});

Backbone.View.prototype.close = function () {
    /* When closing a view, give it a chance to perform it's own custom
     * onClose processing, e.g. handle subview closes, then remove the
     * view from the DOM and unbind events from it.  Based on approach
     * suggested by D. Bailey (author of Marionette) */
    if (this.onClose) {
        this.onClose();
    }
    this.remove();
    this.unbind();  // implied by remove() in BB 1.0.0 and later

};

uPlaylist.utils.loadTemplates(['Home', 'ListView' ] , function() {

    uPlaylist.app = new uPlaylist.AppRouter();
    Backbone.history.start();

});
