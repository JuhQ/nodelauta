define ["jquery", "underscore", "backbone"], ($, _, Backbone) ->
  Backbone.View.extend
    el: "html"
    events:
      "change input[type='file']": "drop"
      "drop body": "drop"

    drop: (event) ->
      element = $(".drop")
      files = null
      event.stopPropagation()
      event.preventDefault()
      return  if _.isUndefined(FileReader)
      files = event.originalEvent.target.files  if event.originalEvent.target.files
      files = event.dataTransfer.files  if event.dataTransfer and event.dataTransfer.files
      return  if _.isNull(files)
      
      # FIXME: for now, only the last image is uploaded to the server
      $.each files, (index, file) ->
        fileReader = new FileReader()
        fileReader.onload = ((file) ->
          (e) ->
            element.append "<p><strong>filename " + file.name + "</strong><br />" + "<img src=\"" + e.target.result + "\" /\"></p>"
            $("input[name='base64']").val e.target.result
        )(file)
        fileReader.readAsDataURL file



