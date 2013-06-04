mongoose = require('mongoose')
exports.config = () ->

  boardSchema = mongoose.Schema {
    name: 'string'
    url: 'string'
    sticky: 'boolean'
  }

  postSchema = mongoose.Schema {
    threadid: 'string'
    boardid: 'string'
    title: 'string'
    content: 'string'
    poster: 'string'
    image: 'string'
    created: 'string'
    lastpost: 'string'
  }
  userSchema = mongoose.Schema {
    email: 'String'
    password: 'String'
    salt: 'String'
    added: 'Date'
    lastvisit: 'Date'
  }

  mongoose.model 'boards', boardSchema
  mongoose.model 'posts', postSchema
  mongoose.model 'users', userSchema

  mongoose.connect 'localhost', 'nodelauta'