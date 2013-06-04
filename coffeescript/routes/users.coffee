mongoose = require('mongoose')
Recaptcha = require("recaptcha").Recaptcha

# Prints registration form
exports.register = (req, res) ->
  res.render "register",
    session: req.session

exports.login = (req, res) ->
  error = 1 if req.params.error
  res.render "login",
    error: error
    session: req.session

# Authenticate using our plain-object database of doom!
authenticate = (email, password, callback) ->
  hash = require("../utils/password").hash

  Users = mongoose.model 'users'
  Users.findOne({
    email: email.toLowerCase()
  }).exec (err, data) ->
    return callback(new Error("cannot find user")) unless data
      
    # apply the same algorithm to the POSTed password, applying
    # the hash against the password / salt, if there is a match we
    # found the user
    hash password, data.salt, (err, salf, hash) ->
      return callback(err) if err
      return callback(null, data) if hash is data.password
      callback new Error("invalid password")

login = (req, res) ->
  authenticate req.body.email, req.body.password, (err, user) ->
    return res.redirect "/login/error" unless user

    # Regenerate session when signing in to prevent fixation
    req.session.regenerate ->
      req.session.user =
        id: user._id
        email: user.email
      res.redirect "/"
      return

exports.handleLogin = login
exports.logout = (req, res) ->
  req.session.destroy()
  res.redirect "/"

exports.createAccount = (req, res) ->
  hash = require("../utils/password").hash

  if req.session.user
    return res.jsonp fail: "logged-in"

  if not req.body.email or not req.body.password or not req.body.blogname
    console.log "No email, password or blogname"
    res.jsonp fail: "empty-fields"
    return

  data =
    remoteip: req.connection.remoteAddress
    challenge: req.body.recaptcha_challenge_field
    response: req.body.recaptcha_response_field

  recaptcha = new Recaptcha("6LcHyuASAAAAAPt4ikPlTtHjHP-qhdBvZ02dbuOk", "6LcHyuASAAAAAKoU47lXVgzQeY6mm4M2ixABmqdS", data)
  recaptcha.verify (success, error_code) ->
    unless success
      res.redirect "/"
      return

    hash req.body.password, (err, salt, password) ->
      throw err if err

      Users = mongoose.model 'users'
      Users.findOne({
        email: req.body.email.toLowerCase()
      }).exec (err, data) ->
        if data
          return res.jsonp fail: "email-taken"

        user = new Users
          email: req.body.email.toLowerCase()
          password: password
          salt: salt

        user.save (err) ->
          login req, res