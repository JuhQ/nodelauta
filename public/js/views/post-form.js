define([
  'jquery',
  'underscore',
  'backbone',
  'models/post',
  'text!templates/post-form.html',
  'libs/backbone.syphon'
  ],
  function(
    $,
    _,
    Backbone,
    Model,
    Template,
    Syphon
  ) {

    return Backbone.View.extend({
        el: ".post-form-container",
        model: Model,
        events: {
            "drop .drop": "drop",
            "change input[type='file']": "drop",
            "submit form": "save",
            "click .post-button": "save"
        },

        initialize: function() {
            _.bindAll(this, "save");

            this.model = new Model();
            this.$el.html(_.template(Template, { board: this.options.board }));
            if(!_.isUndefined(FileReader)) {
                this.$("label:has(input[type='file'])").hide();
            }
        },

        save: function(event) {
            event.preventDefault();
            var that = this;

            this.model.save(Backbone.Syphon.serialize(this));

            // BUG first event is error
            this.model.on("all", function(e) {
                that.$("input, textarea").val("");
                that.$(".drop p").remove();
            });
        },

        drop: function(event) {
            var element = $(".drop")
                files = null;

            event.stopPropagation();
            event.preventDefault();

            if(_.isUndefined(FileReader)) {
                return;
            }

            if(event.originalEvent.target.files) {
                files = event.originalEvent.target.files;
            }
            if(event.dataTransfer && event.dataTransfer.files) {
                files = event.dataTransfer.files;
            }

            if(_.isNull(files)) {
                return;
            }

            // FIXME: for now, only the last image is uploaded to the server
            $.each(files, function(index, file) {
                var fileReader = new FileReader();
                    fileReader.onload = (function(file) {
                        return function(e) {
                            element.append('<p><strong>filename ' + file.name + '</strong><br />' +
                            '<img src="' + e.target.result + '" /"></p>');
                            $("input[name='base64']").val(e.target.result);
                        }; 
                    })(file);
                fileReader.readAsDataURL(file);
            });
        }

    });
});