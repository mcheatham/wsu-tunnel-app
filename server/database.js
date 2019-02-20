const mysql = require('mysql');
const util = require('util');
const config = require('./config.js');

const pool = mysql.createPool(config);
const query = util.promisify(pool.query).bind(pool);

exports.allNodes = async function() {
    return query('SELECT * FROM nodes');
};

exports.allConnections = async function() {
    return query('SELECT * FROM connections');
};

exports.incidentEdges = async function(nodeID) {
    return query('SELECT connectionID FROM connections WHERE nodeA_ID=? OR nodeB_ID=?', [nodeID, nodeID]);
};
