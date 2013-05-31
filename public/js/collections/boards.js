(function() {
  define(["backbone", "models/board"], function(Backbone, Model) {
    return Backbone.Collection.extend({
      url: "/boards",
      model: Model
    });
  });

}).call(this);
