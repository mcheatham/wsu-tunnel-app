import Coordinate from './Coordinate.js';
import Node from './Node.js';
import Edge from './Edge.js';

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
      new Node(0, new Coordinate(39.782748, -84.065313, 288)), // 1, 2, 3
      new Node(1, new Coordinate(39.783935, -84.063350, 288)), // 0, 2
      new Node(2, new Coordinate(39.783944, -84.063361, 288)), // 0, 1, 3
      new Node(3, new Coordinate(39.781619, -84.063501, 288)), // 0, 2, 4
      new Node(4, new Coordinate(39.779162, -84.062181, 288)) // 3
    ];

    nodes[0].incidentEdges.push(new Edge(0, nodes[0], nodes[1], nodes[0].location.distanceTo(nodes[1].location)));
    nodes[0].incidentEdges.push(new Edge(1, nodes[0], nodes[2], nodes[0].location.distanceTo(nodes[2].location)));
    nodes[0].incidentEdges.push(new Edge(2, nodes[0], nodes[3], nodes[0].location.distanceTo(nodes[3].location)));

    nodes[1].incidentEdges.push(new Edge(3, nodes[1], nodes[0], nodes[1].location.distanceTo(nodes[0].location)));
    nodes[1].incidentEdges.push(new Edge(4, nodes[1], nodes[2], nodes[1].location.distanceTo(nodes[2].location)));

    nodes[2].incidentEdges.push(new Edge(5, nodes[2], nodes[0], nodes[2].location.distanceTo(nodes[0].location)));
    nodes[2].incidentEdges.push(new Edge(6, nodes[2], nodes[1], nodes[2].location.distanceTo(nodes[1].location)));
    nodes[2].incidentEdges.push(new Edge(7, nodes[2], nodes[3], nodes[2].location.distanceTo(nodes[3].location)));

    nodes[3].incidentEdges.push(new Edge(8, nodes[0], nodes[0], nodes[3].location.distanceTo(nodes[0].location)));
    nodes[3].incidentEdges.push(new Edge(9, nodes[0], nodes[2], nodes[3].location.distanceTo(nodes[2].location)));
    nodes[3].incidentEdges.push(new Edge(10, nodes[0], nodes[4], nodes[3].location.distanceTo(nodes[4].location)));

    nodes[4].incidentEdges.push(new Edge(11, nodes[4], nodes[3], nodes[4].location.distanceTo(nodes[3].location)));

    console.log(nodes);

    return nodes;
  }
}

Test.graphTest();
