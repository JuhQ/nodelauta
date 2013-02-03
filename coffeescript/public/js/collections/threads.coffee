define ["backbone", "models/thread"], (Backbone, Model) ->
  Backbone.Collection.extend
    url: "/boards/:board"
    model: Model
    initialize: (options) ->
      @url = @url.replace(":board", options.board)
