
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
      window.utils.postForm.model.on("request", function() {
        return new PostsView({
          board: that.board
        });
      });
      return this.anchorNavigation();
    },
    remove: function() {
      window.utils.postForm.model.off("request");
      return Backbone.View.prototype.remove.call(this);
    },
    anchorNavigation: function() {
      var $window, h1, headerHeight, mq, navi, naviWidth;
      h1 = $("h1");
      headerHeight = h1.height() + h1.offset().top;
      navi = $(".sidebar-nav");
      naviWidth = navi.width();
      $window = $(window);
      if (window.matchMedia) {
        mq = window.matchMedia("(min-width: 768px)");
      }
      $window.resize(function() {
        naviWidth = navi.width();
        if (mq && mq.matches) {
          if (navi.hasClass("fixed")) {
            return navi.css({
              "width": navi.parent().width() - (parseInt(navi.css("padding")) * 2)
            });
          }
        } else {
          navi.removeClass("fixed");
          return navi.css({
            "position": "relative",
            "width": ""
          });
        }
      });
      return $window.scroll(function() {
        if ($window.scrollTop() > headerHeight) {
          navi.addClass("fixed");
          if (mq && mq.matches) {
            return navi.css({
              "position": "fixed",
              "top": 0,
              "width": naviWidth
            });
          } else {
            navi.removeClass("fixed");
            return navi.css({
              "position": "relative",
              "width": ""
            });
          }
        } else {
          navi.removeClass("fixed");
          return navi.css({
            "position": "relative",
            "width": ""
          });
        }
      });
    }
  });
});
