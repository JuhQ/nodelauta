define([
  'jquery',
  'underscore',
  'backbone',
  'views/posts',
  'views/post-form'
  ],
  function(
    $,
    _,
    Backbone,
    PostsView,
    PostFormView
  ) {

    return Backbone.View.extend({
      postForm: null,
      board: null,
      initialize: function() {
        var boardUrl = this.options.board || window.utils.boardCollection.at(0).get("url"),
            that = this;

        console.log("threadid ", this.id)

        this.board = window.utils.boardCollection.find(function(board) {
          return board.get("url") === boardUrl;
        });

        if(!window.utils.postForm) {
          window.utils.postForm = new PostFormView();
        }

        window.utils.postForm.render({ board: this.board });
        new PostsView({ board: this.board });

        window.utils.postForm.model.on("request", function() {
          new PostsView({ board: that.board });
        });

      },
      remove: function() {
        window.utils.postForm.model.off("request");

        Backbone.View.prototype.remove.call(this);
      }
    });
});