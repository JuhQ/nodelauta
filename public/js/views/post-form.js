(function() {
  define(["jquery", "underscore", "backbone", "models/post", "text!templates/post-form.html", "libs/backbone.syphon"], function($, _, Backbone, Model, Template, Syphon) {
    return Backbone.View.extend({
      el: ".post-form-container",
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
          this.$("input[name='thread']").val(options.thread);
        }
        if (options.post) {
          return this.$("textarea").focus().val(">>" + options.post + "\n");
        }
      },
      save: function(event) {
        var that;

        event.preventDefault();
        that = this;
        this.model.save(Backbone.Syphon.serialize(this));
        return this.model.on("sync", function() {
          return that.$("input:not(input[name='id'],input[name='thread']), textarea").val("");
        });
      }
    });
  });

}).call(this);
