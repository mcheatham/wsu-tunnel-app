const Node = require('./Node.js');
const Edge = require('./Edge.js');

/**
 * Class for finding paths using the A* algorithm
 */
class PathFinder {

    /**
     * Creates a new A* path-finder for a given map
     * @param {Graph} graph - The graph representing the map to be path found
     */
    constructor(graph) {
      this.graph = graph;
    }

    /**
     * Uses A* to find a path from one node to another
     * <i><b>TODO:</b> This algorithm hasn't been optimized yet, and could likely
     *  have several milliseconds shaved off of its runtime</i>
     * @param {number} startID - The ID of the node to start at
     * @param {number} endID - The ID of the node to end at
     * @return {Object} An object containing data representing the shortest path
     *  between two points
     */
    getPath(startID, endID) {
      console.log('Attempting to find a path from ' + startID + ' to ' + endID);

      //Create a stack to hold the ID's frontier nodes.  this should be kept sorted at all times
      var toVisit = [{id: startID, heuristic: 0}];

      //Stores the distance to each of the nodes visited. Unvisited nodes will have a distance of -1
      var distances = (new Array(this.graph.numNodes)).fill(-1);
      distances[startID] = 0;

      //Stores the node preceding any given node in the path
      var previousNodes = (new Array(this.graph.numNodes)).fill(-1);
      previousNodes[startID] = startID;

      var steps = 0;

      //Begin A* pathfinding
      while(toVisit.length > 0) {
        // console.log("\n#################### STEP NUMBER " + steps + " ####################")
        // console.log("Nodes to visit: ");
        // toVisit.forEach((i) => console.log("\t" + i.id + ": " + i.heuristic));

        //Get the ID of the next node to be visited
        var thisNodeID = toVisit.pop().id;

        // console.log("Popped node " + thisNodeID);

        //Check to see if the end node has been reached
        if(thisNodeID === endID) {
          // console.log("End node has been reached. The distance is " + distances[endID]);
          break;
        }

        //And the node corresponding to that ID
        var thisNode = this.graph.nodes[thisNodeID];

        //Get the nodes adjacent to this node
        thisNode.incidentEdgeIDs.forEach((id) => {
          //Get the edge corresponing to the ID
          var edge = this.graph.edges[id];

          //Get the ID of the node that the edge connects to
          var nextNodeID = edge.getOtherNodeID(thisNodeID);

          //Check to see if either the next node hasn't been visited or the path to the node
          //  via the current path is shorter than the previous one
          if( distances[nextNodeID] == -1 || distances[thisNodeID] + edge.length < distances[nextNodeID]) {
            //Store the total distance to that node
            distances[nextNodeID] = distances[thisNodeID] + edge.length;

            //Store that the previous node along the path to otherNode
            previousNodes[nextNodeID] = thisNodeID;

            //Get the minimum distance from otherNode to the end node
            var crowFlightToEnd = this.graph.nodes[nextNodeID].location.distanceTo(this.graph.nodes[endID].location);

            //Get the A* heuristic distance for this node
            var heuristic = distances[nextNodeID] + crowFlightToEnd;

            //Get the index where this node should be spliced in
            var insertIndex = toVisit.length;

            while(insertIndex !== 0 && heuristic > toVisit[insertIndex-1].heuristic) insertIndex--;

            //And splice it in
            toVisit.splice(insertIndex, 0, {id: nextNodeID, heuristic: heuristic});

            // console.log("Inserted node " + nextNodeID + " at index " + insertIndex);

          }
        });

        steps++;
      }

      //Get the path taken..

      //Object to store path data
      var path = { nodeIDs: [endID], edgeIDs: [] };

      //Iterate backwards through the path, storing it into the path object arrays
      //Note that the resulting arrays will be backwards from the actual direction of the path...
      while(path.nodeIDs[path.nodeIDs.length - 1] !== startID) {
        //Get the ID of this node
        var thisID = path.nodeIDs[path.nodeIDs.length - 1];

        //Get the ID of the previous node in the path
        var previousID = previousNodes[thisID];

        var edgeID = -1;

        //Get the ID of the edge connecting this node to th previous node
        this.graph.nodes[thisID].incidentEdgeIDs.forEach( (i) => {
          if(this.graph.edges[i].getOtherNodeID(thisID) === previousID) edgeID = i;
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
    }
}

module.exports = PathFinder;

// export default PathFinder;
