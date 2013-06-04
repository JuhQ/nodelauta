define [
  "views/index"
  "views/thread"
  "views/create-board"
], (
  IndexView
  ThreadView
  CreateBoardView
  ) ->
  Backbone.Router.extend
    routes:
      "createBoard": "createBoard"
      "": "index"
      ":board": "index"
      ":board/:thread": "thread"
      ":board/:thread/:post": "thread"

    navi: $(".nav li")

    index: (board, thread, post) ->
      @setPage IndexView,
        board: board
        thread: thread
        post: post

    thread: (board, thread, post) ->
      @setPage ThreadView,
        board: board
        thread: thread
        post: post

    createBoard: () ->
      new CreateBoardView()

    setPage: (Page, options) ->
      collection = window.utils.boardCollection
      defaultUrl = collection.at(0).get("url") if collection.at(0)

      board = options.board or Backbone.history.fragment or defaultUrl or ""

      @navi.removeClass "active"
      @navi.find("a[href='#" + board.toLowerCase() + "']").parent("li").addClass "active"
      new Page(options)
      
      _gaq.push ['_trackPageview', board]
