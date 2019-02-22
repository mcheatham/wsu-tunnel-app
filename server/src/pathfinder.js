const database = require('./database.js');
const coordinate = require('./coordinate.js');

exports.getPath = async function(startID, endID) {
    //Retreive end node now as we will be using it many times for our heuristic calculations.
    let endNode = await database.node(endID);

    //Create a stack to hold the ID's frontier nodes.  this should be kept sorted at all times
    let toVisit = [{id: startID, heuristic: 0}];

    //Stores the distance to each of the nodes visited. Unvisited nodes will have a distance of -1
    let distances = new Map();
    distances.set(startID, 0);

    //Stores the node preceding any given node in the path
    let previousNodes = new Map();
    previousNodes.set(startID, {nodeID: startID, edgeID: undefined});

    //Begin A* pathfinding
    while(toVisit.length > 0) {
        //Get the ID of the next node to be visited
        var thisNodeID = toVisit.pop().id;
        console.log("Popped node " + thisNodeID);

        //Check to see if the end node has been reached
        if(thisNodeID === endID) {
            console.log("End node has been reached. The distance is " + distances.get(endID));
            break;
        }

        //Get the nodes adjacent to this node
        let edges = await database.adjacentNodes(thisNodeID);

        for (let edge of edges) {
            let currentPath = distances.get(thisNodeID) + edge.length;
            let previousPath = distances.get(edge.nextNodeID);

            //Check to see if either the next node hasn't been visited or the path to the node
            //via the current path is shorter than the previous one
            if (!previousPath || currentPath < previousPath) {

                //Store the total distance to that node
                distances.set(edge.nextNodeID, currentPath);

                //Store that the previous node along the path to otherNode
                previousNodes.set(edge.nextNodeID, {nodeID: thisNodeID, edgeID: edge.connectionID});

                let otherNode = await database.node(edge.nextNodeID);

                //Get the minimum distance from otherNode to the end node
                let crowFlightToEnd = coordinate.distanceTo(otherNode[0], endNode[0]);

                //Get the A* heuristic distance for this node
                let heuristic = currentPath + crowFlightToEnd;

                //Get the index where this node should be spliced in
                let insertIndex = toVisit.length;
                while (insertIndex !== 0 && heuristic > toVisit[insertIndex-1].heuristic) insertIndex--;

                //And splice it in
                toVisit.splice(insertIndex, 0, {id: edge.nextNodeID, heuristic: heuristic});

                console.log("Inserted node " + edge.nextNodeID + " at index " + insertIndex);
            }
        };
    }

    //Get the path taken..

    //Object to store path data
    let path = { nodeIDs: [endID], edgeIDs: [] };

    //Iterate backwards through the path, storing it into the path object arrays
    //Note that the resulting arrays will be backwards from the actual direction of the path...
    while(path.nodeIDs[path.nodeIDs.length - 1] !== startID) {
        //Get the ID of this node
        var thisID = path.nodeIDs[path.nodeIDs.length - 1];

        //Get the previous node in the path
        let previous = previousNodes.get(thisID);

        //Push the edge and the node IDs into the path
        path.nodeIDs.push(previous.nodeID);
        path.edgeIDs.push(previous.edgeID);
    }

    //Since the arrays were loaded backwards, reverse them now
    //IDEA: if the algorithm searches from end to start, this won't be necessary...
    path.nodeIDs = path.nodeIDs.reverse();
    path.edgeIDs = path.edgeIDs.reverse();

    return path;
};
