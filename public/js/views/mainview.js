(function() {
  define(["jquery", "underscore", "backbone", "views/posts", "views/post-form"], function($, _, Backbone, PostsView, PostFormView) {
    return Backbone.View.extend({
      el: "body",
      events: {
        "click .sidebar-nav .reload": "reload"
      },
      initialize: function() {
        _.bindAll(this, "reload");
        $(".sidebar-nav .reload").tooltip();
        if (!window.utils.postForm) {
          this.postForm = new PostFormView();
        }
        if (!window.utils.postsView) {
          this.postsView = new PostsView();
        }
        return this.anchorNavigation();
      },
      remove: function() {
        window.utils.postForm.model.off("sync");
        return Backbone.View.prototype.remove.call(this);
      },
      reload: function(event) {
        event.preventDefault();
        return this.postsView.render({
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

}).call(this);
