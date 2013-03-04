var mongoose, schema;

mongoose = require('mongoose');

schema = mongoose.Schema({
  threadid: 'string',
  boardid: 'string',
  title: 'string',
  content: 'string',
  poster: 'string',
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
  }).sort('lastpost').exec(function(err, data) {
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
  var Posts, post;
  Posts = mongoose.model('posts', schema);
  post = new Posts({
    threadid: req.body.thread || 0,
    boardid: req.body.id,
    title: req.body.title,
    content: req.body.content,
    poster: req.body.poster,
    image: req.body.base64,
    created: new Date(),
    lastpost: new Date()
  });
  post.save(function(err) {
    console.log('Post saved');
    if (req.body.thread) {
      return Posts.update({
        threadid: req.body.thread
      }, {
        $set: {
          lastpost: new Date()
        }
      });
    }
  });
  return res.send({
    ok: "ok"
  });
};
