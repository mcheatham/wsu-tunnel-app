/**
 * Class representing an edge in the tunnel graph
 */
class Edge {
  /**
   * Creates a new Edge object
   * @param {Node} nodeA - One of the nodes that the edge is adjacent to
   * @param {Node} nodeB - The other node that the edge is adjacent to
   * @param {number} length - The length of the edge in meters
   * @param {Object} [info] - Dictionary containing additional information about the edge
   * @param {boolean} [info.isIndoors=true] - Boolean value specifying if the edge is indoors
   * @param {boolean} [info.hasStairs=false] - Boolean value specifying if the edge includes a staicase
   * @param {boolean} [info.hasElevator=false] - Boolean value specifying if the edge includes an elevator
   */
  constructor(nodeA, nodeB, length, {isIndoors=true, hasStairs=false, hasElevator=false} = {} ) {
    // For now, just do a direct copy from parameters to public fields
    this.nodeA = nodeA;
    this.nodeB = nodeB;
    this.lengt = length;
    this.isIndoors = isIndoors;
    this.hasStairs = hasStairs;
    this.hasElevator = hasElevator;
  }

  /**
   * <b>TODO:</b> Loads the edge with the given id from the database
   * @param {number|string} id - The id of the edge to be loaded
   *      <b>TODO:</b> will edge id's be numbers or strings?
   * @return {Edge} The loaded edge
   */
  static loadByID(id) {
    return 'Umm... sorry. Haven\'t quite gotten around to that yet';
  }
}

export default Egde;
