
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
      var board, defaultUrl;
      if (this.currentView) {
        this.currentView.remove();
        delete currentView;
      }
      if (window.utils.boardCollection.at(0)) {
        defaultUrl = window.utils.boardCollection.at(0).get("url");
      }
      board = options.board || Backbone.history.fragment || defaultUrl || "";
      this.navi.removeClass("active");
      this.navi.find("a[href='#" + board.toLowerCase() + "']").parent("li").addClass("active");
      return this.currentView = new Page(options);
    }
  });
});
