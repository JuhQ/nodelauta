(function() {
  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return Backbone.View.extend({
      el: "html",
      events: {
        "change input[type='file']": "drop",
        "drop body": "drop"
      },
      initialize: function() {
        this.fileReader = new FileReader();
      },
      drop: function(event) {
        var element, files, that;

        event.stopPropagation();
        event.preventDefault();
        that = this;
        element = $(".drop");
        files = null;
        if (_.isUndefined(FileReader)) {
          return;
        }
        if (event.originalEvent.target.files) {
          files = event.originalEvent.target.files;
        }
        if (event.dataTransfer && event.dataTransfer.files) {
          files = event.dataTransfer.files;
        }
        if (_.isNull(files)) {
          return;
        }
        return $.each(files, function(index, file) {
          that.fileReader.onload = (function(file) {
            return function(e) {
              element.append('<p><strong>' + file.name + '</strong><br />' + '<img src="' + e.target.result + '" /"></p>');
              return $("input[name='base64']").val(e.target.result);
            };
          })(file);
          return that.fileReader.readAsDataURL(file);
        });
      }
    });
  });

}).call(this);
