/*
 * GET home page.
 */
function getBoards(req, res, callback) {
    var connection = require("../modules/mysql").db();

    connection.query(
        'SELECT * FROM boards ORDER BY sticky DESC, name ASC',
        [],
        function(err, rows, fields) {
        if (err) {
            throw err;
        }

        if(!callback) {
            res.send(rows);
        } else {
            callback(rows);
        }
    });
}
exports.index = function(req, res) {
    getBoards(req, res, function(rows) {
        console.log(rows);
        res.render('index', { title: 'Nodelauta', rows: rows });
    });
};
exports.boards = function(req, res) {
    getBoards(req, res);
};