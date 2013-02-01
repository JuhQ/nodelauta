
define(["backbone"], function(Backbone) {
  return Backbone.Model.extend({
    url: "/post/:id",
    defaults: {
      title: "",
      content: ""
    },
    initialize: function(options) {
      if (options && options.id) {
        return this.url = this.url.replace(":id", options.id);
      }
    }
  });
});
