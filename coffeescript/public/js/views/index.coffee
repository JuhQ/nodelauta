define ["jquery", "underscore", "backbone", "views/posts", "views/post-form"], ($, _, Backbone, PostsView, PostFormView) ->
  Backbone.View.extend
    postForm: null
    board: null
    initialize: ->
      boardUrl = @options.board or window.utils.boardCollection.at(0).get("url")
      that = this
      console.log "threadid ", @id
      @board = window.utils.boardCollection.find((board) ->
        board.get("url") is boardUrl
      )
      window.utils.postForm = new PostFormView()  unless window.utils.postForm
      window.utils.postForm.render board: @board
      new PostsView(board: @board)
      window.utils.postForm.model.on "request", ->
        new PostsView(board: that.board)


    remove: ->
      window.utils.postForm.model.off "request"
      Backbone.View::remove.call this


