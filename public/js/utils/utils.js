
define(["jquery", "underscore", "backbone", "collections/boards"], function($, _, Backbone, BoardsCollection) {
  var Utils;
  Utils = {};
  Utils.boardCollection = new BoardsCollection();
  return Utils;
});
