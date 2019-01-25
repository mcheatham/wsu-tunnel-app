let mysql = require('mysql');
let config = require('./config.js');
 
let connection = mysql.createConnection(config);
 
connection.query('SELECT * FROM nodes', (error, results, fields) => {
  if (error) return console.error(error.message);

  console.log(results);
});
 
connection.end(); 
