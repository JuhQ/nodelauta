
define(["backbone", "models/post"], function(Backbone, Model) {
  return Backbone.Collection.extend({
    url: "/thread/:thread",
    model: Model,
    initialize: function(options) {
      return this.url = this.url.replace(":thread", options.thread);
    }
  });
});
