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
      _building = undefined, _floor = undefined, _roomNumber = undefined,
      _incidentEdgeIDs = undefined, _isLoaded = false;

    /**
     * Method that checks if the node has been loaded from the database and
     * if not, loads it <i><b>TODO:</b> Make this so it loads from the SQL database</i>
     */
    this.checkIsLoaded = function() {

      // If the data still needs to be loaded
      if(!_isLoaded) {
        // Load the data from the database
        var nodeData = nodeDummyDatabase[_id];

        // Save the data into the private variables
        _location = new Coordinate(nodeData.location.lat, nodeData.location.long, nodeData.location.elev);
        _isIndoors = nodeData.isIndoors;
        _building = nodeData.building;
        _floor = nodeData.floor;
        _roomNumber = nodeData.roomNumber;

        // TODO: Load the edges from the edges database
        _incidentEdgeIDs = [];

        edgeDummyDatabase.forEach((i) => {
          if(i.nodeA_ID == _id || i.nodeB_ID == _id) {
            _incidentEdgeIDs.push(i.id);
          }
        });

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
     * Gets the building (if any) that the node is in
     * @return {string|Building} The building (if any) that the node is in
     * <i><b>TODO:</b> Should there be a Building enum?</i>
     */
    this.getBuilding = function() {
      this.checkIsLoaded();
      return _building;
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

  /** What building (if any) the node is in
   *  <i><b>TODO:</b> Should there be a building enum?</i>
   * @type {string|Building}*/
  get building() { return this.getBuilding() };

  /** What floor the node is on
   * @type {number} */
  get floor() { return this.getFloor() };

  /** The room number of the node
   * @type {string} */
  get roomNumber() { return this.getRoomNumber() };

  /** An array of the ID's of edges that the node is incident to
   * @type {number[]}*/
  get incidentEdgeIDs() { return this.getIncidentEdgeIDs() };

  // ---------- End direct access getters and setters ----------
}

module.exports = Node;
