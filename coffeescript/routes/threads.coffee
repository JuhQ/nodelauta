mongoose = require('mongoose')

schema = mongoose.Schema {
  threadid: 'string'
  boardid: 'string'
  title: 'string'
  content: 'string'
  poster: 'string'
  image: 'string'
  created: 'string'
  lastpost: 'string'
}

exports.getThreads = (req, res) ->
  posts = mongoose.model 'posts', schema
  posts.find({
      boardid: req.params['id']
      threadid: 0
    }).sort('lastpost').exec (err, data) ->
      res.send data

exports.getPosts = (req, res) ->
  posts = mongoose.model 'posts', schema
  posts.find { threadid: req.params['id'] }, (err, data) ->
    res.send data

exports.post = (req, res) ->
  Posts = mongoose.model 'posts', schema
  post = new Posts {
    threadid: req.body.thread or 0
    boardid: req.body.id
    title: req.body.title
    content: req.body.content
    poster: req.body.poster
    image: req.body.base64
    created: new Date()
    lastpost: new Date()
  }
  post.save (err) ->
    console.log 'Post saved'
    if req.body.thread
      Posts.update { threadid: req.body.thread }, { $set: { lastpost: new Date() }}

  res.send ok: "ok"