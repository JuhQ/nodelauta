(function() {
  define(["backbone", "models/board"], function(Backbone, Model) {
    return Backbone.Collection.extend({
      url: "/api/boards",
      model: Model
    });
  });

}).call(this);
