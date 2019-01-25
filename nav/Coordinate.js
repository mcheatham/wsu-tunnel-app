/**
 * Class representing a latitude-longitude coordinate pair,
 * with elevation thrown in for good measure
 */
class Coordinate {
  /**
   * Create a coordinate point object
   * @param {number} lat - the latitude of the coordinate point in degrees
   * @param {number} long - the longitude of the coordinate point in degrees
   * @param {number} elev - the elevation of the coordinate point in meters
   */
  constructor(lat, long, elev) {
    // ---------- Private fields ----------
    var _elev, _lat, _long, _rLat, _rLong;

    // ---------- Getters and setters for private fields ----------

    /**
     * Gets the elevation of the coordinate point in meters
     * @return {number} The elevation of the coordinate point in meters
     */
    this.getElev = function() {
      return _elev;
    };

    /**
     * Sets the elevation of the coordinate point in meters
     * @param {number} elev - The elevation of the coordinate point in meters
     */
    this.setElev = function(elev) {
      _elev = elev;
    };

    /**
     * Gets the latitude of the coordinate point in degrees
     * @return {number} The latitude of the coordinate point in degrees
     */
    this.getLat = function() {
      return _lat;
    };

    /**
     * Sets the latitude of the coordinate point in degrees
     * @param {number} lat - The latitude of the coordinate point in degrees
     */
    this.setLat = function(lat) {
      _lat = lat;
      _rLat = lat * Math.PI / 180;
    };

    /**
     * Gets the longitude of the coordinate point in degrees
     * @return {number} The longitude of the coordinate point in degrees
     */
    this.getLong = function() {
      return _long;
    };

    /**
     * Sets the longitude of the coordinate point in degrees
     * @param {number} long - The longitude of the coordinate point in degrees
     */
    this.setLong = function(long) {
      _long = long;
      _rLong = long * Math.PI / 180;
    };

    /**
     * Sets the latitude of the coordinate point in radians
     * @return {number} The latitude of the coordinate point in radians
     */
    this.getRLat = function() {
      return _rLat;
    };

    /**
     * Sets the latitude of the coordinate point in radians
     * @param {number} rLat - The elevation of the coordinate point in radians
     */
    this.setRLat = function(rLat) {
      _lat = rLat * 180 / Math.PI;
      _rLat = rLat;
    };

    /**
     * Gets the longitude of the coordinate point in radians
     * @return {number} The longitude of the coordinate point in radians
     */
    this.getRLong = function() {
      return _rLong;
    };

    /**
     * Sets the longitude of the coordinate point in radians
     * @param {number} rLong - The longitude of the coordinate point in radians
     */
    this.setRLong = function(rLong) {
      _long = rLong * 180 / Math.PI;
      _rLong = rLong;
    };

    // ---------- End getters and setters for private fields ----------

    //Set the data
    this.setLat(lat);
    this.setLong(long);
    this.setElev(elev);
  }
  // ---------- End constructor ----------

  // ---------- Direct access getters and setters ----------

  /** The elevation of the coordinate point in meters
   * @type {number} */
  get elev() { return this.getElev() }
  set elev(elev) { this.setElev(elev) }

  /** The latitude of the coordinate point in degrees
   * @type {number} */
  get lat() { return this.getLat() }
  set lat(lat) { this.setLat(lat) }

  /** The longitude of the coordinate point in degrees
   * @type {number} */
  get long() { return this.getLong() }
  set long(long) { this.setLong(long) }

  /** The latitude of the coordinate point in radians
   * @type {number} */
  get rLat() { return this.getRLat() }
  set rLat(rLat) { this.setRLat(rLat) }

  /** The longitude of the coordinate point in radians
   * @type {number} */
  get rLong() { return this.getRLong() }
  set rLong(rLong) { this.setRLong(rLong) }

  // ---------- End direct access getters and setters ----------

  // Computes the distance between the current coordinate to the specified coordinate
  /**
    * Computes the distance between this coordinate points and another using the
    * Haversine formula. <br /><b>NOTE: </b>This algorithm has been tweaked for the
    * local radius of the Earth at Wright State University (39.7846° N, 84.0583° W).
    * For use at another location, modify the radius variable.
    * @param {Coordinate} that - The coordinate point to compute distance to
    * @return {number} The distance between the two points in meters
    */
  distanceTo(that) {

    // Radius at ground level at WSU = 6,369,712m  Radius at sea level at WSU= 6,369,424m
    var radius = 6369712;

    //Compute the differences in latitude, longitude, and elevation between the two points
    var dLat = this.rLat - that.rLat;
    var dLong = this.rLong - that.rLong;
    var dElev = this.elev - that.elev;

    var a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(this.rLong) * Math.cos(that.rLong) * Math.pow(Math.sin(dLong / 2), 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = radius * c;

    return Math.sqrt(d*d + dElev * dElev);
  }

  /**
   * Converts the coordinate to a useful JSON representation for storage
   * @return {Object} The JSON representation of the Coordinate
   */
  toJSON() {
    //Copy the values from getters into an object
    return {
      elev: this.elev,
      lat: this.lat,
      long: this.long,
      rLat: this.rLat,
      rLong: this.rLong
    };
  }
}

module.exports = Coordinate;
