
exports.get = function(req, res) {
    var connection = require("../modules/mysql").db();

    connection.query(
        'SELECT * FROM posts ORDER BY created DESC',
        [],
        function(err, rows, fields) {
        if (err) {
            throw err;
        }

        res.send(rows);
    });
};

exports.post = function(req, res) {
    var connection = require("../modules/mysql").db(),
        fs = require('fs');

    connection.query(
        'INSERT INTO posts (thread, title, content, image, created) VALUES (?,?,?,?,NOW())',
        [req.body.thread,req.body.title,req.body.content,req.body.base64],
        function(err, rows, fields) {
        if (err) {
            throw err;
        }

    });

    res.send("post " + req.body.id);
};