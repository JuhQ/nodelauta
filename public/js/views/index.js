
define(["jquery", "underscore", "backbone", "views/posts", "views/post-form"], function($, _, Backbone, PostsView, PostFormView) {
  return Backbone.View.extend({
    postForm: null,
    board: null,
    initialize: function() {
      var boardUrl, that;
      boardUrl = this.options.board || window.utils.boardCollection.at(0).get("url");
      that = this;
      console.log("threadid ", this.id);
      this.board = window.utils.boardCollection.find(function(board) {
        return board.get("url") === boardUrl;
      });
      if (!window.utils.postForm) {
        window.utils.postForm = new PostFormView();
      }
      window.utils.postForm.render({
        board: this.board
      });
      new PostsView({
        board: this.board
      });
      return window.utils.postForm.model.on("request", function() {
        return new PostsView({
          board: that.board
        });
      });
    },
    remove: function() {
      window.utils.postForm.model.off("request");
      return Backbone.View.prototype.remove.call(this);
    }
  });
});
