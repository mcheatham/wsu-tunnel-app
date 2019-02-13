module.exports = {
    getPath: async function(nodes, edges, startID, endID) {
        const server = require('./server.js');

        //Create a stack to hold the ID's frontier nodes.  this should be kept sorted at all times
        let toVisit = [{id: startID, heuristic: 0}];

        //Stores the distance to each of the nodes visited. Unvisited nodes will have a distance of -1
        let distances = (new Array(nodes.length)).fill(-1);
        distances[startID] = 0;

        //Stores the node preceding any given node in the path
        let previousNodes = (new Array(nodes.length)).fill(-1);
        previousNodes[startID] = startID;

        // eslint-disable-next-line
        let steps = 0;

        //Begin A* pathfinding
        while(toVisit.length > 0) {
            //Get the ID of the next node to be visited
            let thisNodeID = toVisit.pop().id;

            console.log("Popped node " + thisNodeID);

            //Check to see if the end node has been reached
            if(thisNodeID === endID) {
                // console.log("End node has been reached. The distance is " + distances[endID]);
                break;
            }

            //And the node corresponding to that ID
            //let thisNode = nodes[thisNodeID];

            let incidentEdgeIDs = await server.queryIncidentEdges(thisNodeID);

            //Get the nodes adjacent to this node
            incidentEdgeIDs.forEach(i => {
                //Get the edge corresponing to the ID
                let edge = edges[i.connectionID];

                //Get the ID of the node that the edge connects to
                //let nextNodeID = edge.getOtherNodeID(thisNodeID);
                //let nextNodeID = thisNodeID === edge.nodeA_ID ? edge.nodeB_ID : edge.nodeA_ID;
                let nextNodeID = getOtherNodeID(thisNodeID, edge.nodeA_ID, edge.nodeB_ID);

                //Check to see if either the next node hasn't been visited or the path to the node
                //  via the current path is shorter than the previous one
                if( distances[nextNodeID] === -1 || distances[thisNodeID] + edge.length < distances[nextNodeID]) {
                    //Store the total distance to that node
                    distances[nextNodeID] = distances[thisNodeID] + edge.length;

                    //Store that the previous node along the path to otherNode
                    previousNodes[nextNodeID] = thisNodeID;

                    //Get the minimum distance from otherNode to the end node
                    let crowFlightToEnd = distanceTo(nodes[nextNodeID], nodes[endID]);
                    //let crowFlightToEnd = nodes[nextNodeID].location.distanceTo(nodes[endID].location);

                    //Get the A* heuristic distance for this node
                    let heuristic = distances[nextNodeID] + crowFlightToEnd;

                    //Get the index where this node should be spliced in
                    let insertIndex = toVisit.length;

                    while(insertIndex !== 0 && heuristic > toVisit[insertIndex-1].heuristic) insertIndex--;

                    //And splice it in
                    toVisit.splice(insertIndex, 0, {id: nextNodeID, heuristic: heuristic});

                    console.log("Inserted node " + nextNodeID + " at index " + insertIndex);
                }
            });

            steps++;
        }

        //Get the path taken..

        //Object to store path data
        let path = { nodeIDs: [endID], edgeIDs: [] };

        //Iterate backwards through the path, storing it into the path object arrays
        //Note that the resulting arrays will be backwards from the actual direction of the path...
        while(path.nodeIDs[path.nodeIDs.length - 1] !== startID) {
            //Get the ID of this node
            let thisID = path.nodeIDs[path.nodeIDs.length - 1];

            //Get the ID of the previous node in the path
            let previousID = previousNodes[thisID];

            let edgeID = -1;

            //Get the ID of the edge connecting this node to th previous node
            // eslint-disable-next-line
            let incidentEdgeIDs = await server.queryIncidentEdges(thisID);

            incidentEdgeIDs.forEach(i => {
                if (getOtherNodeID(thisID, edges[i.connectionID].nodeA_ID, edges[i.connectionID].nodeB_ID) === previousID) edgeID = i.connectionID;
            } );

            //Push the edge and the node IDs into the path
            path.nodeIDs.push(previousID);
            path.edgeIDs.push(edgeID);
        }

        //Since the arrays were loaded backwards, reverse them now
        //IDEA: if the algorithm searches from end to start, this won't be necessary...
        path.nodeIDs = path.nodeIDs.reverse();
        path.edgeIDs = path.edgeIDs.reverse();

        return path;
    },
};

function getOtherNodeID(id, nodeA_ID, nodeB_ID) {
    if( id === nodeA_ID ) return nodeB_ID;
    if( id === nodeB_ID ) return nodeA_ID;
    return -1;
}

function distanceTo(nextNode, endNode) {
    // Radius at ground level at WSU = 6,369,712m  Radius at sea level at WSU= 6,369,424m
    let radius = 6369712;

    //Compute the differences in latitude, longitude, and elevation between the two points
    let dLat = toRad(nextNode.lat) - toRad(endNode.lat);
    let dLong = toRad(nextNode.long) - toRad(endNode.long);
    let dElev = nextNode.elev - endNode.elev;

    let a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(toRad(nextNode.long)) * Math.cos(toRad(endNode.long)) * Math.pow(Math.sin(dLong / 2), 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = radius * c;

    return Math.sqrt(d*d + dElev * dElev);
}

function toRad(deg) {
    return deg * Math.PI / 180;
}
