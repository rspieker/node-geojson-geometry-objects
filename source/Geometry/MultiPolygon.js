const GeometryPosition = require('./Position.js');
const GeometryPolygon = require('./Polygon.js');

/**
 * GeoJSON MultiPolygon
 *
 * @class GeometryMultiPolygon
 * @extends {GeometryPosition}
 */
class GeometryMultiPolygon extends GeometryPosition {
	/**
	 * Creates an instance of GeometryMultiPolygon
	 *
	 * @param    {...GeometryPosition} polygons
	 * @memberof GeometryMultiPolygon
	 */
	constructor(...polygons) {
		super(...polygons.map((poly) => GeometryPolygon.from(poly)));
	}

	/**
	 * Obtain the type
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryMultiPolygon
	 */
	static get type() {
		return 'MultiPolygon';
	}

	/**
	 * Obtain the mappers used to validate and/or constructs
	 * (used by the static .from method)
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryMultiPolygon
	 */
	static get rules() {
		return super.rules.concat([
			{
				validate: (value) =>
					value &&
					typeof value === 'object' &&
					value.type === this.type &&
					Array.isArray(value.coordinates) &&
					value.coordinates.length > 0 &&
					value.coordinates.filter((val) =>
						GeometryPolygon.valid(val)
					).length === value.coordinates.length,
				factory: (value) => new this(...value.coordinates)
			},
			{
				validate: (value) =>
					value &&
					Array.isArray(value) &&
					value.length > 0 &&
					value.filter((val) => GeometryPolygon.valid(val)).length ===
						value.length,
				factory: (value) => new this(...value)
			}
		]);
	}
}

module.exports = GeometryMultiPolygon;
