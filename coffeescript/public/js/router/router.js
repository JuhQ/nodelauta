define ["views/index"], (IndexView) ->
  Backbone.Router.extend
    routes:
      "": "index"
      ":board": "index"
      ":board/:thread": "index"

    navi: $(".nav li")
    currentView: null
    index: (board, thread) ->
      @setPage IndexView,
        board: board
        thread: thread


    setPage: (Page, options) ->
      if @currentView
        @currentView.remove()
        delete currentView
      board = options.board or Backbone.history.fragment or window.utils.boardCollection.at(0).get("url")
      @navi.removeClass "active"
      @navi.find("a[href='#" + board.toLowerCase() + "']").parent("li").addClass "active"
      @currentView = new Page(options)


