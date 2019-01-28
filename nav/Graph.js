const Node = require('./Node.js');
const Edge = require('./Edge.js');

/**
 * Class representing data about the entire map graph
 */
class Graph {
  /**
   * Creates a new graph object with a pre-specified number of nodes and edges.
   * The functions used to load the data for the nodes and edges can be specified as optional parameters.
   * If no value is specified or null are specified, the respective default functions will be used
   * @param {number} numNodes - The number of nodes in the graph
   * @param {number} numEdges - The number of edges in the graph
   * @param {function} [nodeLoader=null] - The function to load the node data with. If null is specified, the
   *    default node laoding function will be used
   * @param {function} [edgeLoader=null] - The function to load the edge data with. If null is specified, the
   *    default edge loading function will be used.
   */
  constructor(numNodes, numEdges, nodeLoader=null, edgeLoader=null) {
    //Create an array of nodes in the graph
    if(nodeLoader === null)
      this.nodes = (new Array(numNodes)).fill(0).map( (i,j) => { return new Node(j) } );
    else
      this.nodes = (new Array(numNodes)).fill(0).map( (i,j) => { return new Node(j, nodeLoader) } );

    //Create an array of edges in the graph
    if(edgeLoader === null)
      this.edges = (new Array(numEdges)).fill(0).map( (i,j) => { return new Edge(j) } );
    else
      this.edges = (new Array(numEdges)).fill(0).map( (i,j) => { return new Edge(j, edgeLoader) } );
  }

  /** Gets the number of nodes in the graph
   * @type {number} */
  get numNodes() { return this.nodes.length };

  /** Gets the number of edges in the graph
   * @type {number} */
  get numEdges() { return this.edges.length };
}

module.exports = Graph;
