define([
  'jquery',
  'underscore',
  'backbone',
  'libs/moment',
  'collections/threads',
  'text!templates/posts.html'
  ],
  function(
    $,
    _,
    Backbone,
    Moment,
    ThreadsCollection,
    Template
  ) {

    return Backbone.View.extend({
      el: ".posts",
      initialize: function() {
        var that = this,
            collection;

        collection = new ThreadsCollection({ board: this.options.board.get("id") });
        collection.fetch({success: function() {
          that.$el.html(_.template(Template, { board: that.options.board.get("url"), collection: collection }));
        }})

      }
    });
});