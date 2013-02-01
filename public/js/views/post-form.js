
define(["jquery", "underscore", "backbone", "models/post", "text!templates/post-form.html", "views/filedrop", "libs/backbone.syphon"], function($, _, Backbone, Model, Template, Filedrop, Syphon) {
  return Backbone.View.extend({
    el: ".post-form-container",
    model: Model,
    events: {
      "submit form": "save",
      "click .post-button": "save"
    },
    render: function(options) {
      this._configure(options || {});
      _.bindAll(this, "save");
      this.model = new Model();
      this.$el.html(_.template(Template, {
        board: this.options.board.get("id")
      }));
      if (!_.isUndefined(FileReader)) {
        this.$("label:has(input[type='file'])").hide();
      }
      return new Filedrop();
    },
    save: function(event) {
      var that;
      event.preventDefault();
      that = this;
      this.model.save(Backbone.Syphon.serialize(this));
      return this.model.on("all", function(e) {
        that.$("input, textarea").val("");
        return that.$(".drop p").remove();
      });
    }
  });
});
