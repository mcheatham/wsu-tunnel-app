const mysql = require('mysql');
const util = require('util');
const config = require('./config.js');

const pool = mysql.createPool(config);
const query = util.promisify(pool.query).bind(pool);

exports.node = async function(nodeID) {
    return query('SELECT * FROM nodes WHERE nodeID = ?', nodeID);
};

exports.adjacentNodes = async function(nodeID) {
    let sql = 'SELECT connectionID, length, nodeA_ID AS nextNodeID '
            + 'FROM connections '
            + 'WHERE nodeB_ID=? '
            + 'UNION '
            + 'SELECT connectionID, length, nodeB_ID AS nextNodeID '
            + 'FROM connections '
            + 'WHERE nodeA_ID=?';
    return query(sql, [nodeID, nodeID]);
};
