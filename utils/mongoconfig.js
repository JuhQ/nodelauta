(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.config = function() {
    var boardSchema, postSchema;

    boardSchema = mongoose.Schema({
      name: 'string',
      url: 'string',
      sticky: 'boolean'
    });
    postSchema = mongoose.Schema({
      threadid: 'string',
      boardid: 'string',
      title: 'string',
      content: 'string',
      poster: 'string',
      image: 'string',
      created: 'string',
      lastpost: 'string'
    });
    mongoose.model('boards', boardSchema);
    mongoose.model('posts', postSchema);
    return mongoose.connect('localhost', 'nodelauta');
  };

}).call(this);
