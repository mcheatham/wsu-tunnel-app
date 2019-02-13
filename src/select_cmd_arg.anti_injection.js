let mysql = require('mysql');
let config = require('./config.js');
 
let connection = mysql.createConnection(config);
 
let nid = process.argv[2];
let cid = process.argv[3];
let sql = 'SELECT * FROM connections WHERE nid=' + mysql.escape(nid) + 'AND connected_nid=' + mysql.escape(cid);
 
connection.query(sql, (error, results, fields) => {
  if (error) return console.error(error.message);

  console.log(results);
});
 
connection.end();
