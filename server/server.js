const mysql = require('mysql');
const express = require('express');
const util = require('util');
const config = require('./config.js');
const pathfinder = require('./pathfinder.js');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

let pool = mysql.createPool(config);
const query = util.promisify(pool.query).bind(pool);

let nodes = undefined;
let edges = undefined;

app.get('/getPath/:start-:end', async (req, res) => {
    if (nodes === undefined) nodes = await query('SELECT * FROM nodes');
    if (edges === undefined ) edges = await query('SELECT * FROM connections');

    const startID = parseInt(req.params.start);
    const endID = parseInt(req.params.end);

    let path = await pathfinder.getPath(nodes, edges, startID, endID);

    res.send(path);
});

module.exports = {
    queryIncidentEdges: async function(nodeID) {
        return query('SELECT connectionID FROM connections WHERE nodeA_ID=? OR nodeB_ID=?', [nodeID, nodeID]);
    }
};
