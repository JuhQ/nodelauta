define ["backbone"], (Backbone) ->
  Backbone.Model.extend
    url: "/post/:id"
    defaults:
      title: ""
      content: ""

    initialize: (options) ->
      @url = @url.replace(":id", options.id)  if options and options.id


