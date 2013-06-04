requirejs.config
  baseUrl: "js"
  enforceDefine: true
  paths:
    jquery: ["http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min", "libs/jquery"]
    backbone: "libs/backbone"
    underscore: "libs/underscore"
    text: "libs/text"
    bootstrap: "libs/bootstrap"

define ["jquery", "underscore", "backbone"], ($, _, Backbone) ->
  require [
    "router/router"
    "bootstrap"
    "utils/utils"
    "libs/fastclick"
    ], (Router, bootstrap, Utils, Fastclick) ->

    Utils.boardCollection.fetch()
    Utils.boardCollection.on "sync", (e) ->
      window.utils = Utils
      window.router = new Router()
      Backbone.history.start()
      new FastClick(document.body)
    
    # jQuery creates it's own event object, and it doesn't have a
    # dataTransfer property yet. This adds dataTransfer to the event object.
    #$.event.props.push "dataTransfer"
    #$("body").bind "dragenter dragover", false
