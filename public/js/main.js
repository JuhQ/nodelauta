
requirejs.config({
  baseUrl: "js",
  enforceDefine: true,
  paths: {
    jquery: "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min",
    backbone: "libs/backbone",
    underscore: "libs/underscore",
    text: "libs/text",
    bootstrap: "libs/bootstrap/js/bootstrap.min"
  }
});

define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
  return require(["router/router", "bootstrap", "utils/utils", "libs/fastclick"], function(Router, bootstrap, Utils, Fastclick) {
    Utils.boardCollection.fetch();
    Utils.boardCollection.on("sync", function(e) {
      window.utils = Utils;
      window.router = new Router();
      return Backbone.history.start();
    });
    $.event.props.push("dataTransfer");
    $("body").bind("dragenter dragover", false);
    return window.addEventListener("load", function() {
      return new FastClick(document.body);
    }, false);
  });
});
