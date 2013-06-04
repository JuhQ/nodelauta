mongoose = require('mongoose')

uploadPath = __dirname + "/uploads/uploadedFileName/"

exports.getThreads = (req, res) ->
  posts = mongoose.model 'posts'
  posts.find(
    boardid: req.params.id
    threadid: 0
  ).sort('-lastpost').exec (err, data) ->
    res.jsonp data

exports.getPosts = (req, res) ->
  posts = mongoose.model 'posts'
  posts.find { threadid: req.params.id }, (err, data) ->
    res.jsonp data

uploadImage = (req, res) ->
  fs = require('fs')

  console.log req.files.image if req.files and req.files.image

  if !(/\.(gif|jpg|jpeg|png)$/i).test req.files.image.type
    return res.jsonp multifail: "wrong image type"

  fs.readFile req.files.image.path, (err, data) ->
    
    filename = (new Date()).getTime() + "." + req.files.image.type
    newPath = uploadPath + filename
    fs.writeFile newPath, data, (err) ->
      callback filename

    ###
      req.files.image.type
      req.files.image.name
      req.files.image.size
      req.files.image.path
    ###


exports.post = (req, res) ->
  callback = (filename) ->
    data = {
      threadid: req.body.thread or 0
      boardid: req.body.id
      title: req.body.title
      content: req.body.content
      poster: req.body.poster
      created: new Date()
      lastpost: new Date()
    }
    if filename
      data.image = filename

    Posts = mongoose.model 'posts'
    post = new Posts data
    post.save (err) ->
      if req.body.thread
        Posts.update { threadid: req.body.thread }, { $set: { lastpost: new Date() }}

    res.jsonp ok: "ok"

  if req.files and req.files.image
    return uploadImage(req, res, callback)

  callback false
