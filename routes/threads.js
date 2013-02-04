var mongoose, schema;

mongoose = require('mongoose');

schema = mongoose.Schema({
  threadid: 'string',
  boardid: 'string',
  title: 'string',
  content: 'string',
  image: 'string',
  created: 'string',
  lastpost: 'string'
});

exports.getThreads = function(req, res) {
  var posts;
  posts = mongoose.model('posts', schema);
  return posts.find({
    boardid: req.params['id'],
    threadid: 0
  }, {
    '__v': 0,
    'threadid': 0,
    'boardid': 0
  }, function(err, data) {
    data.sort({
      lastpost: 'desc'
    });
    return res.send(data);
  });
};

exports.getPosts = function(req, res) {
  var posts;
  posts = mongoose.model('posts', schema);
  return posts.find({
    threadid: req.params['id']
  }, function(err, data) {
    return res.send(data);
  });
};

exports.post = function(req, res) {
  var post, posts;
  posts = mongoose.model('posts', schema);
  post = new posts({
    threadid: req.body.thread || 0,
    boardid: req.body.id,
    title: req.body.title,
    content: req.body.content,
    image: req.body.base64,
    created: new Date(),
    lastpost: new Date()
  });
  post.save(function(err) {
    return console.log('Post saved');
  });
  return res.send({
    ok: "ok"
  });
};
