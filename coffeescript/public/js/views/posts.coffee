define [
  "jquery"
  "underscore"
  "backbone"
  "libs/moment"
  "collections/threads"
  "text!templates/posts.html"
  ], (
    $
    _
    Backbone
    Moment
    ThreadsCollection
    Template
    ) ->
  Backbone.View.extend
    el: ".posts"
    events: {
      "click img": "toggleImage"
    }
    initialize: ->
      that = this

      return unless @options.board
      collection = new ThreadsCollection(board: @options.board.get("_id"))

      collection.fetch success: ->

        that.$el.html _.template(Template,
          board: that.options.board.get("url")
          collection: collection
        )

    toggleImage: (event) ->
      $(event.currentTarget).parent().toggleClass "span12 span3"