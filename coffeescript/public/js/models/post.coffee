define ["backbone"], (Backbone) ->
  Backbone.Model.extend
    urlRoot: "/api/post"
    defaults:
      title: ""
      content: ""

    validate: (attributes) ->
      return "error" unless attributes.content.length
    parse: (response) ->
      response.id = response._id
      response