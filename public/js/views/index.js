define([
  'jquery',
  'underscore',
  'backbone',
  'collections/threads',
  'views/navigation',
  'views/posts',
  'views/post-form',
  'text!templates/index.html'
  ],
  function(
    $,
    _,
    Backbone,
    ThreadsCollection,
    NavigationView,
    PostsView,
    PostFormView,
    Template
  ) {

    return Backbone.View.extend({
      el: ".yay-for-content",
      initialize: function() {
        var board = this.options.board || "b",
            that = this,
            collection,
            postForm;

        console.log("threadid ", this.id)

        postForm = new PostFormView({ board: board });
        new PostsView({ board: board });

        postForm.model.on("request", function() {
          new PostsView({ board: board });
        });

      }
    });
});