define ["backbone", "models/board"], (Backbone, Model) ->
  Backbone.Collection.extend
    url: "/api/boards"
    model: Model
