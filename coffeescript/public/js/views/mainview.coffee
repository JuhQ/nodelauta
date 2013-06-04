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
    el: "body"
    events:
      "click .sidebar-nav .reload": "reload"
    initialize: ->
      _.bindAll @, "reload"
      $(".sidebar-nav .reload").tooltip()

      @postForm = new PostFormView() unless window.utils.postForm
      @postsView = new PostsView() unless window.utils.postsView

      @anchorNavigation()

    remove: ->
      window.utils.postForm.model.off "sync"
      Backbone.View::remove.call this

    reload: (event) ->
      event.preventDefault()
      @postsView.render board: @board, thread: @options.thread

    anchorNavigation: () ->
      h1 = $("h1")
      headerHeight = (h1.height() + h1.offset().top)
      navi = $(".sidebar-nav")
      $window = $(window)
      parent = navi.parent()

      $window.on "scroll resize", ->
        if $window.scrollTop() > headerHeight and $window.width() >= 768
          navi.css "position": "", "width": parent.width() - (parseInt(navi.css("padding"), 10) * 2)
          navi.addClass "fixed"
        else
          navi.removeClass "fixed"
          navi.css "position": "relative", "width": ""
