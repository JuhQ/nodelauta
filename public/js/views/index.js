
define(["jquery", "underscore", "backbone", "views/posts", "views/post-form"], function($, _, Backbone, PostsView, PostFormView) {
  return Backbone.View.extend({
    el: "body",
    postForm: null,
    board: null,
    events: {
      "click .sidebar-nav .reload": "reload"
    },
    initialize: function() {
      var boardUrl, collection, defaultUrl, that;
      _.bindAll(this, "reload");
      collection = window.utils.boardCollection;
      if (collection.at(0)) {
        defaultUrl = collection.at(0).get("url");
      }
      boardUrl = this.options.board || defaultUrl || "";
      that = this;
      $(".sidebar-nav .reload").tooltip();
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
      if (!window.utils.postsView) {
        window.utils.postsView = new PostsView();
      }
      window.utils.postsView.render({
        board: this.board,
        thread: this.options.thread
      });
      window.utils.postForm.model.on("sync", function() {
        return window.utils.postsView.render({
          board: that.board,
          thread: that.options.thread
        });
      });
      return this.anchorNavigation();
    },
    remove: function() {
      window.utils.postForm.model.off("sync");
      return Backbone.View.prototype.remove.call(this);
    },
    reload: function(event) {
      event.preventDefault();
      return window.utils.postsView.render({
        board: this.board,
        thread: this.options.thread
      });
    },
    anchorNavigation: function() {
      var $window, h1, headerHeight, navi, parent;
      h1 = $("h1");
      headerHeight = h1.height() + h1.offset().top;
      navi = $(".sidebar-nav");
      $window = $(window);
      parent = navi.parent();
      return $window.on("scroll resize", function() {
        if ($window.scrollTop() > headerHeight && $window.width() >= 768) {
          navi.css({
            "position": "",
            "width": parent.width() - (parseInt(navi.css("padding"), 10) * 2)
          });
          return navi.addClass("fixed");
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
