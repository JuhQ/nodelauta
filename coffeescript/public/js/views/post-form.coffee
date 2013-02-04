define [
  "jquery"
  "underscore"
  "backbone"
  "models/post"
  "text!templates/post-form.html"
  "views/filedrop"
  "libs/backbone.syphon"
  ], (
  $
  _
  Backbone
  Model
  Template
  Filedrop
  Syphon
  ) ->

  Backbone.View.extend
    el: ".post-form-container"
    events:
      "submit form": "save"
      "click .post-button": "save"

    render: (options) ->
      @_configure options or {}
      _.bindAll this, "save"

      @model = new Model()

      if(@options.board)
        @$el.html _.template(Template,
          board: @options.board.get("_id")
        )

      if options.thread
        @$("textarea").focus().val ">>" + options.thread + "\n"
        @$("input[name='thread']").val(options.thread)
      @$("label:has(input[type='file'])").hide() unless _.isUndefined(FileReader)
      new Filedrop()

    save: (event) ->
      event.preventDefault()
      that = this
      @model.save Backbone.Syphon.serialize(this)
      
      # BUG first event is error
      @model.on "sync", () ->
        that.$("input:not(input[name='id'],input[name='thread']), textarea").val ""
        that.$(".drop p").remove()
