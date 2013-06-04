(function() {
  define(["backbone", "models/thread"], function(Backbone, Model) {
    return Backbone.Collection.extend({
      url: "/api/boards/:board",
      model: Model,
      initialize: function(options) {
        if (options.thread) {
          this.url = this.url.replace("boards", "thread");
          this.url = this.url.replace(":board", options.thread);
          return;
        }
        this.url = this.url.replace(":board", options.board);
      }
    });
  });

}).call(this);
