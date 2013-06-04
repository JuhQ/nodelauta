(function() {
  define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
      urlRoot: "/api/post",
      defaults: {
        title: "",
        content: ""
      },
      parse: function(response) {
        response.id = response._id;
        return response;
      }
    });
  });

}).call(this);
