const Coordinate = require('./Coordinate.js');
const Node = require('./Node.js');
const Edge = require('./Edge.js');

/**
 * Class for testing algorithm, loading, etc...
 */
class Test {
  /**
   * Creates a basic test graph in the general vicinity of Wright State
   * @return {Node[]} The array of nodes representing the graph
   */
  static graphTest() {
    var nodes = [
      new Node(0), // 1, 2, 3
      new Node(1), // 0, 2
      new Node(2), // 0, 1, 3
      new Node(3), // 0, 2, 4
      new Node(4) // 3
    ];

    var edges = [
      new Edge(0),
      new Edge(1),
      new Edge(2),
      new Edge(3),
      new Edge(4),
      new Edge(5),
    ]

    return {nodes: nodes, edges: edges};
  }
}
