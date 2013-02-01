
requirejs.config({
  baseUrl: "js",
  enforceDefine: true,
  paths: {
    jquery: "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min",
    jsapi: "http://www.google.com/jsapi?callback=define",
    backbone: "libs/backbone",
    underscore: "libs/underscore",
    text: "libs/text",
    bootstrap: "libs/bootstrap/js/bootstrap.min"
  }
});

define(["jquery", "underscore", "backbone", "jsapi"], function($, _, Backbone) {
  return require(["router/router", "bootstrap", "utils/utils"], function(Router, bootstrap, Utils) {
    Utils.boardCollection.fetch();
    Utils.boardCollection.on("sync", function(e) {
      window.utils = Utils;
      window.router = new Router();
      return Backbone.history.start();
    });
    $.event.props.push("dataTransfer");
    return $("body").bind("dragenter dragover", false);
  });
});
