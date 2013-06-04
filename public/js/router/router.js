(function() {
  define(["views/index", "views/thread", "views/create-board"], function(IndexView, ThreadView, CreateBoardView) {
    return Backbone.Router.extend({
      routes: {
        "createBoard": "createBoard",
        "": "index",
        ":board": "index",
        ":board/:thread": "thread",
        ":board/:thread/:post": "thread"
      },
      navi: $(".nav li"),
      index: function(board, thread, post) {
        return this.setPage(IndexView, {
          board: board,
          thread: thread,
          post: post
        });
      },
      thread: function(board, thread, post) {
        return this.setPage(ThreadView, {
          board: board,
          thread: thread,
          post: post
        });
      },
      createBoard: function() {
        return new CreateBoardView();
      },
      setPage: function(Page, options) {
        var board, collection, defaultUrl;

        collection = window.utils.boardCollection;
        if (collection.at(0)) {
          defaultUrl = collection.at(0).get("url");
        }
        board = options.board || Backbone.history.fragment || defaultUrl || "";
        this.navi.removeClass("active");
        this.navi.find("a[href='#" + board.toLowerCase() + "']").parent("li").addClass("active");
        new Page(options);
        return _gaq.push(['_trackPageview', board]);
      }
    });
  });

}).call(this);
