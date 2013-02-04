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
    currentView: null

    index: (board, thread) ->
      @setPage IndexView,
        board: board
        thread: thread

    createBoard: () ->
      console.log "yay"
      new CreateBoardView()

    setPage: (Page, options) ->
      if @currentView
        @currentView.remove()
        delete currentView

      collection = window.utils.boardCollection
      defaultUrl = collection.get("url") if collection.at(0)

      board = options.board or Backbone.history.fragment or defaultUrl or ""
      @navi.removeClass "active"
      @navi.find("a[href='#" + board.toLowerCase() + "']").parent("li").addClass "active"
      @currentView = new Page(options)
