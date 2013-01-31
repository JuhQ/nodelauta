define([
    "views/index"
    ],
    function(
        Index
    ) {
        return Backbone.Router.extend({
          routes: {
            "": "index",
            ":board": "index",
            ":board/:id": "index"
          },
          navi: $(".nav li"),

          index: function(board, id) {
            this.setPage(Index, { board: board, id: id });
          },

          setPage: function(Page, options) {
            var board = options.board || Backbone.history.fragment;
            this.navi.removeClass("active");
            this.navi.find("a[href='#" + board.toLowerCase() + "']").parent("li").addClass("active");
            new Page(options);
          }

        });
    }
);