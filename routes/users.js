(function() {
  var Recaptcha, authenticate, login, mongoose;

  mongoose = require('mongoose');

  Recaptcha = require("recaptcha").Recaptcha;

  exports.register = function(req, res) {
    return res.render("register", {
      session: req.session
    });
  };

  exports.login = function(req, res) {
    var error;

    if (req.params.error) {
      error = 1;
    }
    return res.render("login", {
      error: error,
      session: req.session
    });
  };

  authenticate = function(email, password, callback) {
    var Users, hash;

    hash = require("../utils/password").hash;
    Users = mongoose.model('users');
    return Users.findOne({
      email: email.toLowerCase()
    }).exec(function(err, data) {
      if (!data) {
        return callback(new Error("cannot find user"));
      }
      return hash(password, data.salt, function(err, salf, hash) {
        if (err) {
          return callback(err);
        }
        if (hash === data.password) {
          return callback(null, data);
        }
        return callback(new Error("invalid password"));
      });
    });
  };

  login = function(req, res) {
    return authenticate(req.body.email, req.body.password, function(err, user) {
      if (!user) {
        return res.redirect("/login/error");
      }
      return req.session.regenerate(function() {
        req.session.user = {
          id: user._id,
          email: user.email
        };
        res.redirect("/");
      });
    });
  };

  exports.handleLogin = login;

  exports.logout = function(req, res) {
    req.session.destroy();
    return res.redirect("/");
  };

  exports.createAccount = function(req, res) {
    var data, hash, recaptcha;

    hash = require("../utils/password").hash;
    if (req.session.user) {
      return res.jsonp({
        fail: "logged-in"
      });
    }
    if (!req.body.email || !req.body.password || !req.body.blogname) {
      console.log("No email, password or blogname");
      res.jsonp({
        fail: "empty-fields"
      });
      return;
    }
    data = {
      remoteip: req.connection.remoteAddress,
      challenge: req.body.recaptcha_challenge_field,
      response: req.body.recaptcha_response_field
    };
    recaptcha = new Recaptcha("6LcHyuASAAAAAPt4ikPlTtHjHP-qhdBvZ02dbuOk", "6LcHyuASAAAAAKoU47lXVgzQeY6mm4M2ixABmqdS", data);
    return recaptcha.verify(function(success, error_code) {
      if (!success) {
        res.redirect("/");
        return;
      }
      return hash(req.body.password, function(err, salt, password) {
        var Users;

        if (err) {
          throw err;
        }
        Users = mongoose.model('users');
        return Users.findOne({
          email: req.body.email.toLowerCase()
        }).exec(function(err, data) {
          var user;

          if (data) {
            return res.jsonp({
              fail: "email-taken"
            });
          }
          user = new Users({
            email: req.body.email.toLowerCase(),
            password: password,
            salt: salt
          });
          return user.save(function(err) {
            return login(req, res);
          });
        });
      });
    });
  };

}).call(this);
