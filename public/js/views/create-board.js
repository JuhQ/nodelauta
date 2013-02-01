
define(["jquery", "underscore", "backbone", "models/board", "text!templates/create-board.html", "libs/backbone.syphon"], function($, _, Backbone, Model, Template, Syphon) {
  return Backbone.View.extend({
    el: ".posts",
    events: {
      "submit form": "save",
      "click .create-board": "save"
    },
    initialize: function(options) {
      _.bindAll(this, "save");
      return this.$el.html(_.template(Template));
    },
    save: function(event) {
      var model;
      event.preventDefault();
      model = new Model();
      model.url = "createBoard";
      model.save(Backbone.Syphon.serialize(this));
      return model.on("all", function(e) {
        return that.$("input").val("");
      });
    }
  });
});
