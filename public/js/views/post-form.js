
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
      if (this.options.board) {
        this.$el.html(_.template(Template, {
          board: this.options.board.get("_id")
        }));
      }
      if (options.thread) {
        this.$("textarea").val(">>" + options.thread);
        this.$("input[name='thread']").val(options.thread);
      }
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
        that.$("input:not(input[name='board']), textarea").val("");
        return that.$(".drop p").remove();
      });
    }
  });
});
