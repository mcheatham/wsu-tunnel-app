let mysql = require('mysql');
let config = require('./config.js');

let connection = mysql.createConnection(config);

let sql = 'SELECT * FROM connections WHERE nid=? AND connected_nid=?'
connection.query(sql, [1, 2], (error, results, fields) => {
    if (error) return console.error(error.message);

    console.log(results);
});

connection.end();
