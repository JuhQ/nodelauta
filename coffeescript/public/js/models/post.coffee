define ["backbone"], (Backbone) ->
  Backbone.Model.extend
    urlRoot: "/post"
    defaults:
      title: ""
      content: ""

    validate: (attributes) ->
      return "error" unless attributes.content.length