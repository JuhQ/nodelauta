define([
  'jquery',
  'underscore',
  'backbone'
  ],
  function(
    $,
    _,
    Backbone
  ) {

    return Backbone.View.extend({
        el: "html",
        events: {
            "change input[type='file']": "drop",
            "drop body": "drop"
        },

        initialize: function() {
            if(!_.isUndefined(FileReader)) {
                this.fileReader = new FileReader();
            }
        },

        drop: function(event) {
            var element = $(".drop"),
                that = this,
                files = null;

            event.stopPropagation();
            event.preventDefault();

            if(_.isUndefined(this.fileReader)) {
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
                that.fileReader.onload = (function(file) {
                    return function(e) {
                        element.append('<p><strong>filename ' + file.name + '</strong><br />' +
                        '<img src="' + e.target.result + '" /"></p>');
                        $("input[name='base64']").val(e.target.result);
                    }; 
                })(file);
                that.fileReader.readAsDataURL(file);
            });
        }

    });
});