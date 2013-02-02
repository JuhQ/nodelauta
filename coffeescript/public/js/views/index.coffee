define [
  "jquery"
  "underscore"
  "backbone"
  "views/posts"
  "views/post-form"
  ], (
    $
    _
    Backbone
    PostsView
    PostFormView
    ) ->

  Backbone.View.extend
    postForm: null
    board: null
    initialize: ->
      defaultUrl = window.utils.boardCollection.at(0).get("url") if window.utils.boardCollection.at(0)
      boardUrl = @options.board or defaultUrl or ""
      that = this

      console.log "threadid ", @.options.thread

      @board = window.utils.boardCollection.find((board) ->
        board.get("url") is boardUrl
      )

      window.utils.postForm = new PostFormView() unless window.utils.postForm
      window.utils.postForm.render board: @board, thread: @.options.thread
      new PostsView(board: @board)

      window.utils.postForm.model.on "request", ->
        new PostsView(board: that.board)

      @anchorNavigation()       

    remove: ->
      window.utils.postForm.model.off "request"
      Backbone.View::remove.call this

    anchorNavigation: () ->
      h1 = $("h1")
      headerHeight = (h1.height() + h1.offset().top)
      navi = $(".sidebar-nav")
      naviWidth = navi.width()
      $window = $(window)
      mq = window.matchMedia "(min-width: 768px)" if window.matchMedia

      $window.on "scroll resize" ->
        if $window.scrollTop() > headerHeight
          navi.addClass "fixed"
          if mq and mq.matches
            navi.css "position": "fixed", "top": 0, "width": naviWidth
          else
            navi.removeClass "fixed"
            navi.css "position": "relative", "width": ""
        else
          navi.removeClass "fixed"
          navi.css "position": "relative", "width": ""
