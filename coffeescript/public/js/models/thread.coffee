define ["backbone"], (Backbone) ->
  Backbone.Model.extend
    urlRoot: "/post"
    defaults:
      title: ""
      content: ""