mongoose = require('mongoose')

schema = mongoose.Schema {
  name: 'string'
  url: 'string'
  sticky: 'boolean'
}

getBoards = (req, res, callback) ->
  boards = mongoose.model 'boards', schema

  boards.find { }, (err, data) ->
    unless callback
      res.send data
    else
      callback data

exports.index = (req, res) ->
  getBoards req, res, (rows) ->
    console.log rows
    res.render "index",
      title: "Nodelauta"
      rows: rows

exports.boards = (req, res) ->
  getBoards req, res

exports.createBoard = (req, res) ->
  console.log "creating board"
  boards = mongoose.model 'boards', schema
  board = new boards {
    name: req.body.name
    url: req.body.url
    sticky: req.body.sticky
  }
  board.save (err) ->
    console.log 'row saved'
