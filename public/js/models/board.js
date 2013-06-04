(function() {
  define(["backbone"], function(Backbone) {
    return Backbone.Model.extend({
      urlRoot: "/api/board",
      parse: function(response) {
        response.id = response._id;
        return response;
      }
    });
  });

}).call(this);
