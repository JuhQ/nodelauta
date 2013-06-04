define ["backbone", "models/post"], (Backbone, Model) ->
  Backbone.Collection.extend
    url: "/api/thread/:thread"
    model: Model
    initialize: (options) ->
      @url = @url.replace(":thread", options.thread)
      return