(function() {
  define(["jquery", "underscore", "backbone", "libs/moment", "collections/threads", "collections/posts", "text!templates/posts.html", "text!templates/replies.html"], function($, _, Backbone, Moment, ThreadsCollection, PostsCollection, ThreadTemplate, PostTemplate) {
    return Backbone.View.extend({
      el: ".posts",
      events: {
        "click img": "toggleImage"
      },
      render: function(options) {
        var that, threads;

        this._configure(options || {});
        that = this;
        if (!this.options.board) {
          return;
        }
        threads = new ThreadsCollection({
          board: this.options.board.get("_id")
        });
        return threads.fetch({
          success: function() {
            var _this = this;

            that.$el.html(_.template(ThreadTemplate, {
              boards: that.options.board,
              collection: threads
            }));
            return threads.each(function(model) {
              var posts;

              posts = new PostsCollection({
                thread: model.get("_id")
              });
              return posts.fetch({
                success: function() {
                  return that.$el.find("#" + model.get("_id") + " .replies").html(_.template(PostTemplate, {
                    boards: that.options.board,
                    collection: posts
                  }));
                }
              });
            });
          }
        });
      },
      toggleImage: function(event) {
        return $(event.target).parent("div").toggleClass("span3 span12");
      }
    });
  });

}).call(this);
