define ["jquery", "underscore", "backbone", "collections/boards"], ($, _, Backbone, BoardsCollection) ->

  Utils = {}
  Utils.boardCollection = new BoardsCollection()
  Utils