
define(["backbone", "models/thread"], function(Backbone, Model) {
  return Backbone.Collection.extend({
    url: "/boards/:board",
    model: Model,
    initialize: function(options) {
      return this.url = this.url.replace(":board", options.board);
    }
  });
});
