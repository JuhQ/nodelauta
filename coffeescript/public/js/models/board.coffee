define ["backbone"], (Backbone) ->
  Backbone.Model.extend
    urlRoot: "/api/board"
    parse: (response) ->
      response.id = response._id
      response