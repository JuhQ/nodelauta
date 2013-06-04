define [
  "jquery"
  "underscore"
  "backbone"
  "models/board"
  "text!templates/create-board.html"
  "libs/backbone.syphon"
  ], (
  $
  _
  Backbone
  Model
  Template
  Syphon
    ) ->
  Backbone.View.extend
    el: ".posts"
    events:
      "submit form": "save"
      "click .create-board": "save"

    initialize: (options) ->
      _.bindAll this, "save"
      @$el.html(_.template Template)

    save: (event) ->
      event.preventDefault()
      that = this
      
      model = new Model id: "createBoard"
      model.save Backbone.Syphon.serialize(this)
      
      # BUG first event is error
      model.on "all", (e) ->
        that.$("input").val ""
