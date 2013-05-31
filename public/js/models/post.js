(function() {
  define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
      urlRoot: "/post",
      defaults: {
        title: "",
        content: ""
      },
      validate: function(attributes) {
        if (!attributes.content.length) {
          return "error";
        }
      }
    });
  });

}).call(this);
