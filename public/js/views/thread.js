(function() {
  define(["jquery", "underscore", "backbone", "views/mainview"], function($, _, Backbone, MainView) {
    return MainView.extend({
      el: "body",
      postForm: null,
      board: null,
      initialize: function() {
        var boardUrl, collection, defaultUrl, that;

        MainView.prototype.initialize.call(this);
        collection = window.utils.boardCollection;
        if (collection.at(0)) {
          defaultUrl = collection.at(0).get("url");
        }
        boardUrl = this.options.board || defaultUrl || "";
        that = this;
        this.board = window.utils.boardCollection.find(function(board) {
          return board.get("url") === boardUrl;
        });
        this.postForm.render({
          board: this.board,
          thread: this.options.thread,
          post: this.options.post
        });
        this.postsView.render({
          board: this.board,
          thread: this.options.thread
        });
        return this.postForm.model.on("sync", function() {
          return that.postsView.render({
            board: that.board,
            thread: that.options.thread
          });
        });
      }
    });
  });

}).call(this);
