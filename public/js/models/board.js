
define(["backbone"], function(Backbone) {
  return Backbone.Model.extend({
    url: "/board/:board",
    initialize: function(options) {
      if (options && options.board) {
        return this.url = this.url.replace(":board", options.board);
      }
    }
  });
});
