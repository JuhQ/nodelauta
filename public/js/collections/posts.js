(function() {
  define(["backbone", "models/post"], function(Backbone, Model) {
    return Backbone.Collection.extend({
      url: "/thread/:thread",
      model: Model,
      initialize: function(options) {
        this.url = this.url.replace(":thread", options.thread);
      }
    });
  });

}).call(this);
