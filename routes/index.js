var getBoards, mongoose, schema;

mongoose = require('mongoose');

schema = mongoose.Schema({
  name: 'string',
  url: 'string',
  sticky: 'boolean'
});

getBoards = function(req, res, callback) {
  var boards;
  boards = mongoose.model('boards', schema);
  return boards.find({}, function(err, data) {
    if (!callback) {
      return res.send(data);
    } else {
      return callback(data);
    }
  });
};

exports.index = function(req, res) {
  return getBoards(req, res, function(rows) {
    console.log(rows);
    return res.render("index", {
      title: "Nodelauta",
      rows: rows
    });
  });
};

exports.boards = function(req, res) {
  return getBoards(req, res);
};

exports.createBoard = function(req, res) {
  var board, boards;
  console.log("creating board");
  boards = mongoose.model('boards', schema);
  board = new boards({
    name: req.body.name,
    url: req.body.url,
    sticky: req.body.sticky
  });
  return board.save(function(err) {
    return console.log('row saved');
  });
};
