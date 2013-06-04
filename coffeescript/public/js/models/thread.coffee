define ["backbone"], (Backbone) ->
  Backbone.Model.extend
    urlRoot: "/api/post"
    defaults:
      title: ""
      content: ""
    parse: (response) ->
      response.id = response._id
      response