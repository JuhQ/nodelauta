mongoose = require('mongoose')

schema = mongoose.Schema {
  threadid: 'string'
  boardid: 'string'
  title: 'string'
  content: 'string'
  image: 'string'
  created: 'string'
  lastpost: 'string'
}

exports.getThreads = (req, res) ->
  console.log(req.params['id'])
  posts = mongoose.model 'posts', schema
  posts.find { boardid: req.params['id'], threadid: 0 }, (err, data) ->
    data.sort({ lastpost: 'desc' })
    res.send data

exports.getPosts = (req, res) ->
  posts = mongoose.model 'posts', schema
  posts.find { threadid: req.params['id'] }, (err, data) ->
    res.send data

exports.post = (req, res) ->
  posts = mongoose.model 'posts', schema
  post = new posts {
    threadid: req.body.thread or 0
    boardid: req.body.board
    title: req.body.title
    content: req.body.content
    image: req.body.base64
    created: new Date()
    lastpost: new Date()
  }
  post.save (err) ->
    console.log 'row saved'

  res.send "ok"
  