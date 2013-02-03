
define(["jquery", "underscore", "backbone", "libs/moment", "collections/threads", "text!templates/posts.html"], function($, _, Backbone, Moment, ThreadsCollection, Template) {
  return Backbone.View.extend({
    el: ".posts",
    events: {
      "click img": "toggleImage"
    },
    render: function(options) {
      var collection, that;
      this._configure(options || {});
      that = this;
      if (!this.options.board) {
        return;
      }
      collection = new ThreadsCollection({
        board: this.options.board.get("_id")
      });
      return collection.fetch({
        success: function() {
          return that.$el.html(_.template(Template, {
            board: that.options.board.get("url"),
            collection: collection
          }));
        }
      });
    },
    toggleImage: function(event) {
      console.log($(event.target));
      console.log($(event.currentTarget).parent());
      return $(event.target).parent("div").toggleClass("span3 span12");
    }
  });
});
