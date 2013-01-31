var mysqlCache = null;
exports.db = function(callback) {
    var mysql,
        connection;

    if(!mysqlCache) {
        mysql      = require('mysql');
        connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'spudro',
            password : 'spadre',
        });

        console.log("new mysql connection");

        connection.connect();
        connection.query("USE nodelauta");

        mysqlCache = connection;
    }

    connection = mysqlCache;

    // shorthand function for ending connection and removing cache
    connection.kill = function() {
        mysqlCache = null;
        connection.end();
    };
    return connection;
};