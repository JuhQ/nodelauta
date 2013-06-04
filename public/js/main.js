(function() {
  requirejs.config({
    baseUrl: "js",
    enforceDefine: true,
    paths: {
      jquery: "http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min",
      backbone: "libs/backbone",
      underscore: "libs/underscore",
      text: "libs/text",
      bootstrap: "libs/bootstrap/js/bootstrap.min"
    }
  });

  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    return require(["router/router", "bootstrap", "utils/utils", "libs/fastclick"], function(Router, bootstrap, Utils, Fastclick) {
      Utils.boardCollection.fetch();
      return Utils.boardCollection.on("sync", function(e) {
        window.utils = Utils;
        window.router = new Router();
        Backbone.history.start();
        return new FastClick(document.body);
      });
    });
  });

}).call(this);
