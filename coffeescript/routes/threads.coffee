mongoose = require('mongoose')

exports.getThreads = (req, res) ->
  posts = mongoose.model 'posts'
  posts.find(
    boardid: req.params.id
    threadid: 0
  ).sort('lastpost').exec (err, data) ->
    res.jsonp data

exports.getPosts = (req, res) ->
  posts = mongoose.model 'posts'
  posts.find { threadid: req.params.id }, (err, data) ->
    res.jsonp data

uploadImage = (req, res) ->

  fs = require('fs')

  console.log req.files.image

  if req.files.image.type isnt "image/png"
    return res.jsonp fail: "lol"

  Images = mongoose.model "images"
  image = new Images
    user: req.session.user
    added: new Date()
  image.save ->

    callback()

    res.render "uploaded",
      path: req.files.image.path


    ###
    fs.readFile req.files.image.path, (err, data) ->
      
      # ...
      newPath = __dirname + "/uploads/uploadedFileName"
      fs.writeFile newPath, data, (err) ->
        res.redirect "back"


    console.log "image", image
    ###
    ###
      '\nuploaded %s, %s (%d Kb) to %s as %s'
      req.files.image.type
      req.files.image.name
      req.files.image.size / 1024 | 0
      req.files.image.path
      req.body.title
    ###

    ###
    res.render "uploaded",
      path: req.files.image.path
    ###


exports.post = (req, res) ->
  callback = () ->
    Posts = mongoose.model 'posts'
    post = new Posts {
      threadid: req.body.thread or 0
      boardid: req.body.id
      title: req.body.title
      content: req.body.content
      poster: req.body.poster
      image: image
      created: new Date()
      lastpost: new Date()
    }
    post.save (err) ->
      console.log 'Post saved'
      if req.body.thread
        Posts.update { threadid: req.body.thread }, { $set: { lastpost: new Date() }}

    res.jsonp ok: "ok"

  if req.files.image
    return uploadImage(req, res, callback)

  callback()
