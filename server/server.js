let mysql = require('mysql');
let config = require('./config.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/getNode/:nid', (req, res) => {
    let connection = mysql.createConnection(config);

    connection.query('SELECT * FROM nodes WHERE nodeID=?', req.params.nid, (error, results, fields) => {
        if (error) return console.error(error.message);
        res.send(results);
    });

    connection.end();
});

app.get('/getEdges/:nid', (req, res) => {
    let connection = mysql.createConnection(config);

    connection.query('SELECT connectionID FROM nodes WHERE nodeA_ID=? OR nodeB_ID=?', req.params.nid, (error, results, fields) => {
        if (error) return console.error(error.message);
        res.send(results);
    });

    connection.end();
});

app.get('/getNodes', (req, res) => {
    let connection = mysql.createConnection(config);

    connection.query('SELECT * FROM nodes', req.params.nid, (error, results, fields) => {
        if (error) return console.error(error.message);
        res.send(results);
    });

    connection.end();
});

app.get('/getConnections', (req, res) => {
    let connection = mysql.createConnection(config);

    connection.query('SELECT * FROM connections', req.params.nid, (error, results, fields) => {
        if (error) return console.error(error.message);
        res.send(results);
    });

    connection.end();
});
