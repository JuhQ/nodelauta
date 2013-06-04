(function() {
  var mongoose, uploadImage, uploadPath;

  mongoose = require('mongoose');

  uploadPath = __dirname + "/uploads/uploadedFileName/";

  exports.getThreads = function(req, res) {
    var posts;

    posts = mongoose.model('posts');
    return posts.find({
      boardid: req.params.id,
      threadid: 0
    }).sort('-lastpost').exec(function(err, data) {
      return res.jsonp(data);
    });
  };

  exports.getPosts = function(req, res) {
    var posts;

    posts = mongoose.model('posts');
    return posts.find({
      threadid: req.params.id
    }, function(err, data) {
      return res.jsonp(data);
    });
  };

  uploadImage = function(req, res) {
    var fs;

    fs = require('fs');
    if (req.files && req.files.image) {
      console.log(req.files.image);
    }
    if (!/\.(gif|jpg|jpeg|png)$/i.test(req.files.image.type)) {
      return res.jsonp({
        multifail: "wrong image type"
      });
    }
    return fs.readFile(req.files.image.path, function(err, data) {
      var filename, newPath;

      filename = (new Date()).getTime() + "." + req.files.image.type;
      newPath = uploadPath + filename;
      return fs.writeFile(newPath, data, function(err) {
        return callback(filename);
      });
      /*
        req.files.image.type
        req.files.image.name
        req.files.image.size
        req.files.image.path
      */

    });
  };

  exports.post = function(req, res) {
    var callback;

    callback = function(filename) {
      var Posts, data, post;

      data = {
        threadid: req.body.thread || 0,
        boardid: req.body.id,
        title: req.body.title,
        content: req.body.content,
        poster: req.body.poster,
        created: new Date(),
        lastpost: new Date()
      };
      if (filename) {
        data.image = filename;
      }
      Posts = mongoose.model('posts');
      post = new Posts(data);
      post.save(function(err) {
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
      return res.jsonp({
        ok: "ok"
      });
    };
    if (req.files && req.files.image) {
      return uploadImage(req, res, callback);
    }
    return callback(false);
  };

}).call(this);
