define ["backbone", "models/board"], (Backbone, Model) ->
  Backbone.Collection.extend
    url: "/boards"
    model: Model


