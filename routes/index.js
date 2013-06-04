(function() {
  var getBoards, mongoose;

  mongoose = require('mongoose');

  getBoards = function(req, res, callback) {
    var boards;

    boards = mongoose.model('boards');
    return boards.find({}, function(err, data) {
      if (!callback) {
        return res.jsonp(data);
      } else {
        return callback(data);
      }
    });
  };

  exports.index = function(req, res) {
    return getBoards(req, res, function(rows) {
      return res.render("index", {
        rows: rows
      });
    });
  };

  exports.boards = function(req, res) {
    return getBoards(req, res);
  };

  exports.createBoard = function(req, res) {
    var Boards, board;

    Boards = mongoose.model('boards');
    board = new Boards({
      name: req.body.name,
      url: req.body.url,
      sticky: req.body.sticky
    });
    return board.save(function(err) {
      return res.jsonp({
        done: true
      });
    });
  };

}).call(this);
