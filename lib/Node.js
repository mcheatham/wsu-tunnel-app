/**
 * Class representing a node in the tunnel graph
 */
class Node {
  /**
   * Creates a new Node Object <b>TODO:</b> Are there any more datapoints that could be useful?
   * @param {number} id - The id of the node
   * @param {Coordinate} location - The location of the node
   * @param {Object} [info] - Additional information about the node
   * @param {boolean} [info.isIndoors=true] - Boolean value specifying if the node is indoors
   * @param {string|Building} [info.building=null] - The building that the node is in. If none, specify null.
            If the node is in the tunnels, specify 'TUNNEL' <b>TODO:</b> Should there be
            a buildings enum?
   * @param {number} [info.floor=null] - The floor that the node is on
   * @param {string} [info.roomNumber=null] - The room number associated with the node
   * @param {Edge[]} [info.incidentEdges=[]] - The edges that are incident to the node
   */
  constructor(id, location, {isIndoors=true, building=null, floor=null, roomNumber=null, incidentEdges=[]}={}) {
    // For now, just do a direct copy from parameters to public fields
    this.id = id;
    this.location = location;
    this.isIndoors = isIndoors;
    this.building = building;
    this.floor = floor;
    this.roomNumber = roomNumber
    this.incidentEdges = incidentEdges;
  }

  /**
   * <b>TODO:</b> Loads the node with the given id from the database
   * @param {number} id - The id of the node to be loaded
   * @return {Node} The loaded node
   */
  static loadByID(id) {
    return 'Umm... sorry. Haven\'t quite gotten around to that yet';
  }
}

module.exports = Node;
