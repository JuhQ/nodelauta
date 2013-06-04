(function() {
  define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
      urlRoot: "/api/post",
      defaults: {
        title: "",
        content: ""
      },
      validate: function(attributes) {
        if (!attributes.content.length) {
          return "error";
        }
      },
      parse: function(response) {
        response.id = response._id;
        return response;
      }
    });
  });

}).call(this);
