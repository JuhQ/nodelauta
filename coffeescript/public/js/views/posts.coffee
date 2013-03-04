define [
  "jquery"
  "underscore"
  "backbone"
  "libs/moment"
  "collections/threads"
  "collections/posts"
  "text!templates/posts.html"
  "text!templates/replies.html"
  ], (
  $
  _
  Backbone
  Moment
  ThreadsCollection
  PostsCollection
  ThreadTemplate
  PostTemplate
  ) ->
  Backbone.View.extend
    el: ".posts"
    events: {
      "click img": "toggleImage"
    }
    
    render: (options) ->
      @_configure options or {}
      that = this

      return unless @options.board
      threads = new ThreadsCollection board: @options.board.get "_id"
      threads.fetch success: ->

        that.$el.html _.template(ThreadTemplate,
          boards: that.options.board
          collection: threads
        )

        threads.each (model) =>
          posts = new PostsCollection thread: model.get "_id"
          posts.fetch success: ->
            that.$el.find("#" + model.get("_id") + " .replies").html _.template(PostTemplate,
              boards: that.options.board
              collection: posts
            )

    toggleImage: (event) ->
      $(event.target).parent("div").toggleClass "span3 span12"