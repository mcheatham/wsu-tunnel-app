import Coordinate from './Coordinate.js';
import Node from './Node.js';
import Edge from './Edge.js';
import PathFinder from './PathFinder.js';
import Graph from './Graph.js';

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

  /**
   * Runs a test of the path finding algorithm between two nodes
   * @param {number} start - The ID of the node to start at
   * @param {number} end - The ID of the node to end at
   */
  static pathFinderTest(start, end) {
    var aStar = new PathFinder(new Graph(5, 6));

    var path = aStar.getPath(start, end);

    var pathString = "The path is ";

    path.nodeIDs.forEach((i,j) => pathString += (j !== 0 ? " => ":"") + i);

    console.log(pathString);
  }
}

Test.pathFinderTest(0, 0);
Test.pathFinderTest(0, 1);
Test.pathFinderTest(0, 2);
Test.pathFinderTest(0, 3);
Test.pathFinderTest(0, 4);

console.log();

Test.pathFinderTest(1, 0);
Test.pathFinderTest(1, 1);
Test.pathFinderTest(1, 2);
Test.pathFinderTest(1, 3);
Test.pathFinderTest(1, 4);

console.log();

Test.pathFinderTest(2, 0);
Test.pathFinderTest(2, 1);
Test.pathFinderTest(2, 2);
Test.pathFinderTest(2, 3);
Test.pathFinderTest(2, 4);

console.log();

Test.pathFinderTest(3, 0);
Test.pathFinderTest(3, 1);
Test.pathFinderTest(3, 2);
Test.pathFinderTest(3, 3);
Test.pathFinderTest(3, 4);

console.log();

Test.pathFinderTest(4, 0);
Test.pathFinderTest(4, 1);
Test.pathFinderTest(4, 2);
Test.pathFinderTest(4, 3);
Test.pathFinderTest(4, 4);
