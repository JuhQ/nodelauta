
define(["views/index", "views/create-board"], function(IndexView, CreateBoardView) {
  return Backbone.Router.extend({
    routes: {
      "createBoard": "createBoard",
      "": "index",
      ":board": "index",
      ":board/:thread": "index"
    },
    navi: $(".nav li"),
    currentView: null,
    index: function(board, thread) {
      return this.setPage(IndexView, {
        board: board,
        thread: thread
      });
    },
    createBoard: function() {
      console.log("yay");
      return new CreateBoardView();
    },
    setPage: function(Page, options) {
      var board, collection, defaultUrl;
      if (this.currentView) {
        this.currentView.remove();
        delete this.currentView;
      }
      collection = window.utils.boardCollection;
      if (collection.at(0)) {
        defaultUrl = collection.get("url");
      }
      board = options.board || Backbone.history.fragment || defaultUrl || "";
      this.navi.removeClass("active");
      this.navi.find("a[href='#" + board.toLowerCase() + "']").parent("li").addClass("active");
      return this.currentView = new Page(options);
    }
  });
});
