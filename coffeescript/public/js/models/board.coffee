define ["backbone"], (Backbone) ->
  Backbone.Model.extend
    url: "/board/:board"
    initialize: (options) ->
      @url = @url.replace(":board", options.board)  if options and options.board


