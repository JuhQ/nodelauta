(function() {
  var mongoose, uploadImage;

  mongoose = require('mongoose');

  exports.getThreads = function(req, res) {
    var posts;

    posts = mongoose.model('posts');
    return posts.find({
      boardid: req.params.id,
      threadid: 0
    }).sort('lastpost').exec(function(err, data) {
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
    var Images, fs, image;

    fs = require('fs');
    console.log(req.files.image);
    if (req.files.image.type !== "image/png") {
      return res.jsonp({
        fail: "lol"
      });
    }
    Images = mongoose.model("images");
    image = new Images({
      user: req.session.user,
      added: new Date()
    });
    return image.save(function() {
      callback();
      return res.render("uploaded", {
        path: req.files.image.path
      });
      /*
      fs.readFile req.files.image.path, (err, data) ->
        
        # ...
        newPath = __dirname + "/uploads/uploadedFileName"
        fs.writeFile newPath, data, (err) ->
          res.redirect "back"
      
      
      console.log "image", image
      */

      /*
        '\nuploaded %s, %s (%d Kb) to %s as %s'
        req.files.image.type
        req.files.image.name
        req.files.image.size / 1024 | 0
        req.files.image.path
        req.body.title
      */

      /*
      res.render "uploaded",
        path: req.files.image.path
      */

    });
  };

  exports.post = function(req, res) {
    var callback;

    callback = function() {
      var Posts, post;

      Posts = mongoose.model('posts');
      post = new Posts({
        threadid: req.body.thread || 0,
        boardid: req.body.id,
        title: req.body.title,
        content: req.body.content,
        poster: req.body.poster,
        image: image,
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
      return res.jsonp({
        ok: "ok"
      });
    };
    if (req.files.image) {
      return uploadImage(req, res, callback);
    }
    return callback();
  };

}).call(this);
