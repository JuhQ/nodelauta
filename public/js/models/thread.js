(function() {
  define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
      urlRoot: "/post",
      defaults: {
        title: "",
        content: ""
      }
    });
  });

}).call(this);
