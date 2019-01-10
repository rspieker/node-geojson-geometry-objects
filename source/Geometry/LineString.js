const GeometryMultiPoint = require('./MultiPoint.js');

/**
 * GeoJSON LineString
 *
 * @class GeometryLineString
 * @extends {GeometryMultiPoint}
 */
class GeometryLineString extends GeometryMultiPoint {
	/**
	 * Obtain the type
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryLineString
	 */
	static get type() {
		return 'LineString';
	}
}

module.exports = GeometryLineString;
