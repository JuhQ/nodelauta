
define(["jquery", "underscore", "backbone", "views/posts", "views/post-form"], function($, _, Backbone, PostsView, PostFormView) {
  return Backbone.View.extend({
    postForm: null,
    board: null,
    initialize: function() {
      var boardUrl, defaultUrl, that;
      if (window.utils.boardCollection.at(0)) {
        defaultUrl = window.utils.boardCollection.at(0).get("url");
      }
      boardUrl = this.options.board || defaultUrl || "";
      that = this;
      console.log("threadid ", this.options.thread);
      this.board = window.utils.boardCollection.find(function(board) {
        return board.get("url") === boardUrl;
      });
      if (!window.utils.postForm) {
        window.utils.postForm = new PostFormView();
      }
      window.utils.postForm.render({
        board: this.board,
        thread: this.options.thread
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
