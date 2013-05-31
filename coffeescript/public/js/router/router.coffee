define [
  "views/index"
  "views/create-board"
], (
  IndexView
  CreateBoardView
  ) ->
  Backbone.Router.extend
    routes:
      "createBoard": "createBoard"
      "": "index"
      ":board": "index"
      ":board/:thread": "index"

    navi: $(".nav li")

    index: (board, thread) ->
      @setPage IndexView,
        board: board
        thread: thread

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
