define [
  "jquery"
  "underscore"
  "backbone"
  ], (
  $
  _
  Backbone
  ) ->
  Backbone.View.extend
    el: "html"
    events:
      "change input[type='file']": "drop"
      "drop body": "drop"

    initialize: () ->
      @fileReader = new FileReader()

    drop: (event) ->
      event.stopPropagation()
      event.preventDefault()

      that = this
      element = $(".drop")
      files = null
      
      return if _.isUndefined(FileReader)

      files = event.originalEvent.target.files if event.originalEvent.target.files
      files = event.dataTransfer.files if event.dataTransfer and event.dataTransfer.files
      
      return if _.isNull(files)
      
      # FIXME: for now, only the last image is uploaded to the server
      $.each files, (index, file) ->
        that.fileReader.onload = ((file) ->
          (e) ->
            element.append '<p><strong>' + file.name + '</strong><br />' +
            '<img src="' + e.target.result + '" /"></p>'
            $("input[name='base64']").val e.target.result
        )(file)
        that.fileReader.readAsDataURL file
