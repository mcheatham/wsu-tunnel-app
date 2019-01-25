const nodeDummyDatabase = require('./dummyNodes.js');
const edgeDummyDatabase = require('./dummyEdges.js');
const Coordinate = require('./Coordinate.js');

// This is a temporary database
// TODO: Get the program to load from the SQL database

/**
 * Class representing a node in the tunnel graph. Actual information about the
 * node is not loaded from the database until it is needed.
 * <i><b>TODO:</b> Are there any more data points that could be useful?</i>
 */
class Node {
  /**
   * Creates a new Node Object
   * @param {number} id - The id of the node
   */
  constructor(id) {
    // ---------- Private fields ----------
    // All of these fields will be read-only
    var _id = id, _location = undefined, _isIndoors = undefined,
      _buildingID = undefined, _floor = undefined, _roomNumber = undefined,
      _incidentEdgeIDs = undefined, _nodeTypeID = undefined, _isLoaded = false;

    /**
     * Method that checks if the node has been loaded from the database and
     * if not, loads it.
     */
    this.checkIsLoaded = function() {

      // If the data still needs to be loaded
      if(!_isLoaded) {
        // Load the data from the database
        var nodeData = loadNodeData(_id);

        // Save the data into the private variables
        _location = new Coordinate(nodeData.location.lat, nodeData.location.long, nodeData.location.elev);
        _isIndoors = nodeData.isIndoors;
        _buildingID = nodeData.buildingID;
        _floor = nodeData.floor;
        _roomNumber = nodeData.roomNumber;
        _incidentEdgeIDs = loadIncidentEdges(_id);
        _nodeTypeID = nodeData.nodeTypeID

        // Record that the data has been loaded
        _isLoaded = true;
      }
    };


    // ---------- Getters for private fields ----------

    /**
     * Gets the ID of the node
     * @return {number} The ID of the node
     */
    this.getID = function() { return _id }

    /**
     * Gets whether or not the node has been loaded
     * @return {boolean} Whether or not the node has been loaded
     */
    this.getIsLoaded = function() { return _isLoaded }

    /**
     * Gets the location of the node
     * @return {Coordinate} The location of the node
     */
    this.getLocation = function() {
      this.checkIsLoaded();
      return _location;
    }

    /**
     * Gets whether or not the node is indoors
     * @return {boolean} Whether the node is indoors or not
     */
    this.getIsIndoors = function() {
      this.checkIsLoaded();
      return _isIndoors;
    }

    /**
     * Gets the ID of the building that the node is in
     * @return {number} The ID of the building that the node is in
     */
    this.getBuildingID = function() {
      this.checkIsLoaded();
      return _buildingID;
    }

    /**
     * Gets the floor that the node is on
     * @return {number} The floor that the node is on
     */
    this.getFloor = function() {
      this.checkIsLoaded();
      return _floor;
    }

    /**
     * Gets the room number of the node
     * @return {string} The room number of the node
     */
    this.getRoomNumber = function() {
      this.checkIsLoaded();
      return _isLoaded;
    }

    /**
     * Gets an array of ID's of the edges that are incident to the node
     * @return {number[]} The ID's of the edges that are incident to the node
     */
    this.getIncidentEdgeIDs = function() {
      this.checkIsLoaded();
      return _incidentEdges;
    }

    /**
     * Gets the ID of the node's type
     * @return {number} The ID of the node's type
     */
    this.getNodeTypeID = function() {
      this.checkIsLoaded();
      return _nodeTypeID;
    }
    // ---------- End getters for private fields ----------
  }

  // ---------- Direct access getters ----------

  /** The ID of the node in the database
   * @type {number} */
  get id() { return this.getID() };

  /** Whether or not the node has been loaded
   * @type {boolean} */
  get isLoaded() { return this.getIsLoaded() };

  /** The location of the node
   * @type {Coordinate} */
  get location() { return this.getLocation() };

  /** Value specifying if the node is indoors
   * @type {boolean} */
  get isIndoors() { return this.getIsIndoors() };

  /** The ID of the  building that the node is in
   * @type {number}*/
  get buildingID() { return this.getBuildingID() };

  /** What floor the node is on
   * @type {number} */
  get floor() { return this.getFloor() };

  /** The room number of the node
   * @type {string} */
  get roomNumber() { return this.getRoomNumber() };

  /** An array of the ID's of edges that the node is incident to
   * @type {number[]}*/
  get incidentEdgeIDs() { return this.getIncidentEdgeIDs() };

  /** The ID of th node's type
   * @type {number} */
  get nodeTypeID() {return this.getNodeTypeID() };

  // ---------- End direct access getters and setters ----------
}

/**
 * This functions connects to the database, reads the information about a given node,
 * and then returns it as a JSON object
 * @param {number} id - The ID of the node to be loaded
 * @return {Object} The data for that node
 */
function loadNodeData(id) {
  console.log("Loading node " + id);
  return nodeDummyDatabase[id];
}

/**
 * This function connects to the database and finds all edges that are incident
 * to a given node
 * @param {number} id - The ID of the node to find edges incident to
 * @return {number[]} The ID's of all the edges that are incident to the given node
 */
function loadIncidentEdges(id) {
  var edges = [];
  edgeDummyDatabase.forEach((i) => {
    if(i.nodeA_ID == _id || i.nodeB_ID == _id) {
      edges.push(i.id);
    }
  });

  return edges;
}

module.exports = Node;
