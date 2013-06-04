define ["backbone", "models/thread"], (Backbone, Model) ->
  Backbone.Collection.extend
    url: "/api/boards/:board"
    model: Model
    initialize: (options) ->

      if options.thread
        @url = @url.replace("boards", "thread")
        @url = @url.replace(":board", options.thread)
        return

      @url = @url.replace(":board", options.board)
      return
