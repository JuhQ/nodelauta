define([
  'jquery',
  'underscore',
  'backbone',
  'collections/boards',
  'text!templates/navigation.html'
  ],
  function(
    $,
    _,
    Backbone,
    BoardsCollection,
    Template
  ) {

    return Backbone.View.extend({
      el: ".sidebar-nav",
      initialize: function() {
        var that = this,
            collection;

        collection = new BoardsCollection();
        collection.fetch({success: function() {
          that.$el.html(_.template(Template, { collection: collection }));
        }})

      }
    });
});