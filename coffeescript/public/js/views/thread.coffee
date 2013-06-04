define [
  "jquery"
  "underscore"
  "backbone"
  "views/mainview"
  ], (
  $
  _
  Backbone
  MainView
  ) ->

  MainView.extend
    el: "body"
    postForm: null
    board: null
    initialize: ->
      MainView::initialize.call this
      
      collection = window.utils.boardCollection
      defaultUrl = collection.at(0).get("url") if collection.at(0)
      boardUrl = @options.board or defaultUrl or ""
      that = @

      @board = window.utils.boardCollection.find((board) ->
        board.get("url") is boardUrl
      )

      @postForm.render board: @board, thread: @options.thread, post: @options.post
      @postsView.render board: @board, thread: @options.thread

      @postForm.model.on "sync", ->
        that.postsView.render board: that.board, thread: that.options.thread

