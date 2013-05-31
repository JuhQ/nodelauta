(function() {
  define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
      urlRoot: "/board"
    });
  });

}).call(this);
