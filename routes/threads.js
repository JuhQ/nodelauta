
exports.getThreads = function(req, res) {
    var connection = require("../modules/mysql").db();

    connection.query(
        'SELECT * FROM posts WHERE threadid IS NULL AND boardid = ? ORDER BY lastpost DESC',
        [req.params['id']],
        function(err, rows, fields) {
        if (err) {
            throw err;
        }

        res.send(rows);
    });
};

exports.getPosts = function(req, res) {
    var connection = require("../modules/mysql").db();

    connection.query(
        'SELECT * FROM posts WHERE threadid = ? ORDER BY created DESC',
        [req.params['id']],
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
        'INSERT INTO posts (threadid, boardid, title, content, image, created, lastpost) VALUES (?,?,?,?,?,NOW(),NOW())',
        [req.body.thread,req.body.board,req.body.title,req.body.content,req.body.base64],
        function(err, rows, fields) {
        if (err) {
            throw err;
        }

    });

    if(req.body.thread) {
        connection.query(
            'UPDATE posts SET lastpost = NOW() WHERE id = ?',
            [req.body.thread],
            function(err, rows, fields) {
            if (err) {
                throw err;
            }
        });
    }

    res.send("post " + req.body.id);
};