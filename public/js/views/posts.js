define([
  'jquery',
  'underscore',
  'backbone',
  'collections/threads',
  'text!templates/posts.html'
  ],
  function(
    $,
    _,
    Backbone,
    ThreadsCollection,
    Template
  ) {

    return Backbone.View.extend({
      el: ".posts",
      initialize: function() {
        var that = this,
            collection;

        collection = new ThreadsCollection({ board: this.options.board });
        collection.fetch({success: function() {
          that.$el.html(_.template(Template, { board: that.options.board, collection: collection }));
        }})

      }
    });
});