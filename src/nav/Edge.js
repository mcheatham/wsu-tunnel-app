import edgeDummyDatabase from './dummyEdges.js';

/**
 * Class representing an edge in the tunnel graph
 * <i><b>TODO:</b> are there any more data points that could be useful?</i>
 */
class Edge {
  /**
   * Creates a new Edge object
   * @param {number} id - The id of the edge
   * @param {function} [loader=loadEdgeData] - A function that will load edge data from a database and return it as a JSON object
   */
  constructor(id, loader=loadEdgeData) {

    this.loader = loader;

    // ---------- Private fields ----------
    var _id = id, _nodeA_ID = undefined, _nodeB_ID = undefined, _length = undefined,
      _isIndoors = undefined, _hasStairs = undefined, _hasElevator = undefined,
      _width = undefined, _isLoaded = false, _isLoading;

    /**
     * Method that checks if the edge has been loaded from the database and
     * if not, loads it <i><b>TODO:</b> Make this so it loads from the SQL database</i>
     */
    this.checkIsLoaded = function() {
      if(!_isLoaded) {
        this.load();
      }
    }

    /**
     * Method to load Edge data, regardless of whether or not it has already been loaded.
     */
    this.load = function() {

      //Don't start reloading the data if it is already being loaded
      if(!_isLoading) {
        //Set that the data is being loaded.
        _isLoading = true;

        //TODO: Should this be asynchronous
        // Get the data from the database
        var edgeData = this.loader(_id);

        // Transfer the data to the private fields
        _nodeA_ID = edgeData.nodeA_ID;
        _nodeB_ID = edgeData.nodeB_ID;
        _length = edgeData.length;
        _isIndoors = edgeData.isIndoors;
        _hasStairs = edgeData.hasStairs;
        _hasElevator = edgeData.hasElevator;
        _width = edgeData.width;

        // Set that the edge has been loaded
        _isLoaded = true;
        _isLoading = false;
      }
    }

    /**
     * Method to 'unload' Edge data. This can be used to free up space if the edge
     * is no longer being used
     */
    this.unload = function() {
      _isLoaded = false;
      _isLoading = false;

      _nodeA_ID = undefined;
      _nodeB_ID = undefined;
      _length = undefined;
      _isIndoors = undefined;
      _hasStairs = undefined;
      _hasElevator = undefined;
      _width = undefined;
    }

    // ---------- Getters for private fields ----------

    /** Gets the ID of the edge in the database
     * @return {number} The ID of the edge in the database */
    this.getID = function() { return _id };

    /** Gets whether or not the edge has been loaded
     * @return {boolean} Whether or not the edge has been loaded */
    this.getIsLoaded = function() { return _isLoaded };

    /** Gets the ID of one of the nodes that the edge is incident to
     * @return {number} The ID of one of the nodes that the edge is incident to */
    this.getNodeA_ID = function() {
      this.checkIsLoaded();
      return _nodeA_ID;
    }

    /** Gets the ID of the other node that the edge is incident to
     * @return {number} The ID of the other node that the edge is incident to*/
    this.getNodeB_ID = function() {
      this.checkIsLoaded();
      return _nodeB_ID;
    }

    /** Gets the length of the edge in meters
     * @return {number} The length of the edge in meters */
    this.getLength = function() {
      this.checkIsLoaded();
      return _length;
    }

    /** Gets whether or not the edge is <i>entirely</i> indoors
     * @return {boolean} Whether or not the edge is <i>entirely</i> indoors */
    this.getIsIndoors = function() {
      this.checkIsLoaded();
      return _isIndoors;
    }

    /** Gets whether or not the edge has a staircase that must be traversed
     * @return {boolean} Whether or not the edge has a staircase that must be traversed */
    this.getHasStairs = function() {
      this.checkIsLoaded();
      return _hasStairs;
    }

    /** Gets whether or not the edge includes an elevator that must be ridden in
     * @return {boolean} Whether or not the edge includes an elevator that must be ridden in */
    this.getHasElevator = function() {
      this.checkIsLoaded();
      return _hasElevator;
    }

    /** Gets the width of the edge in meters
     * @return {number} the width of the edge in meters */
    this.getWidth = function() {
      this.checkIsLoaded();
      return _width;
    }

    // ---------- End getters for private fields ----------
  }

  // -------- Direct access getters for private fields

  /** The ID of the edge in the database
   * @type {number} */
  get id() { return this.getID() };

  /** Whether or not the edge has been loaded from the database
   * @type {boolean} */
  get isLoaded() { return this.getIsLoaded() };

  /** The ID of one of the nodes that the edge is adjacent to
   * @type {number} */
  get nodeA_ID() { return this.getNodeA_ID() };

  /** The ID of the other node that the edge is adjacent to
   * @type {number} */
  get nodeB_ID() { return this.getNodeB_ID() };

  /** The length of the node in meters
   * @type {number} */
  get length() { return this.getLength() };

  /** Whether or not the edge is <i>entirely</i> indoors
   * @type {boolean} */
  get isIndoors() { return this.getIsIndoors() };

  /** Whether or not the edge includes a staircase
   * @type {boolean} */
  get hasStairs() { return this.getHasStairs() };

  /** Whether or not the edge includes an elevator
   * @type {boolean} */
  get hasElevator() { return this.getHasElevator() };

  /** The width of the edge in meters
   * @type{number} */
  get width() { return this.getWidth() };

  // ---------- End direct access getters ----------

  /**
   * Takes the ID of one of the nodes that the edge is incident to and returns
   *  the ID of the other node which the edge is incident to. If neither of the
   *  incident edges have the given ID, -1 is returned.
   * @param {number} id - The ID of one of the nodes that the edge is adjacent to
   * @return {number} The ID of the other node that the edge is adjacent to
   */
  getOtherNodeID(id) {
    if( id === this.nodeA_ID ) return this.nodeB_ID;
    if( id === this.nodeB_ID ) return this.nodeA_ID;
    return -1;
  }
}

/**
 * This functions connects to the database, reads the information about a given edge,
 * and then returns it as a JSON object
 * @param {number} id - The ID of the edge to be loaded
 * @return {Object} The data for that edge
 */
function loadEdgeData(id) {
  // console.log(" - Loading data for edge " + id);
  return edgeDummyDatabase[id];
}

// module.exports = Edge;
export default Edge;
