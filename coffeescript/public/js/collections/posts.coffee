define ["backbone", "models/post"], (Backbone, Model) ->
  Backbone.Collection.extend
    url: "/thread/:thread"
    model: Model
    initialize: (options) ->
      @url = @url.replace(":thread", options.thread)
      return