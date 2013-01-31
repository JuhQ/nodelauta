define([
    "views/index"
    ],
    function(
        IndexView
    ) {
        return Backbone.Router.extend({
          routes: {
            "": "index",
            ":board": "index",
            ":board/:thread": "index"
          },
          navi: $(".nav li"),
          currentView: null,

          index: function(board, thread) {
            this.setPage(IndexView, { board: board, thread: thread });
          },

          setPage: function(Page, options) {
            if(this.currentView) {
              this.currentView.remove();
              delete currentView;
            }

            var board = options.board || Backbone.history.fragment || window.utils.boardCollection.at(0).get("url");
            this.navi.removeClass("active");
            this.navi.find("a[href='#" + board.toLowerCase() + "']").parent("li").addClass("active");
            this.currentView = new Page(options);
          }

        });
    }
);