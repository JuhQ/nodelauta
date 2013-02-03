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

      @board = window.utils.boardCollection.find((board) ->
        board.get("url") is boardUrl
      )

      window.utils.postForm = new PostFormView() unless window.utils.postForm
      window.utils.postForm.render board: @board, thread: @.options.thread

      window.utils.postsView = new PostsView() unless window.utils.postsView
      window.utils.postsView.render board: @board, thread: @.options.thread

      window.utils.postForm.model.on "request", ->
        window.utils.postsView.render board: @board, thread: that.options.thread

      @anchorNavigation()       

    remove: ->
      window.utils.postForm.model.off "request"
      Backbone.View::remove.call this

    anchorNavigation: () ->
      h1 = $("h1")
      headerHeight = (h1.height() + h1.offset().top)
      navi = $(".sidebar-nav")
      $window = $(window)

      $window.on "scroll resize", ->
        if $window.scrollTop() > headerHeight and $window.width() >= 768
          navi.css "position": "", "width": navi.parent().width() - (parseInt(navi.css("padding")) * 2)
          navi.addClass "fixed"
        else
          navi.removeClass "fixed"
          navi.css "position": "relative", "width": ""
