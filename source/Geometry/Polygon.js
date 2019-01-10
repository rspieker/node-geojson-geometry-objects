const GeometryPosition = require('./Position.js');
const LinearRing = require('./LinearRing.js');

/**
 * GeoJSON Polygon
 *
 * @class GeometryPolygon
 * @extends {GeometryPosition}
 */
class GeometryPolygon extends GeometryPosition {
	/**
	 * Creates an instance of GeometryPolygon
	 *
	 * @param    ...rings
	 * @memberof GeometryPolygon
	 */
	constructor(...rings) {
		super(...rings.map((ring) => LinearRing.from(ring)));
	}

	/**
	 * Obtain the type
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryPolygon
	 */
	static get type() {
		return 'Polygon';
	}

	/**
	 * Obtain the mappers used to validate and/or constructs
	 * (used by the static .from method)
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryPolygon
	 */
	static get mapping() {
		return super.mapping.concat([
			{
				validate: (value) =>
					value &&
					typeof value === 'object' &&
					value.type === this.type &&
					Array.isArray(value.coordinates) &&
					value.coordinates.length > 0 &&
					value.coordinates.filter((val) => LinearRing.valid(val))
						.length === value.coordinates.length,
				factory: (value) => new this(...value.coordinates)
			},
			{
				validate: (value) =>
					value &&
					Array.isArray(value) &&
					value.length > 0 &&
					value.filter((val) => LinearRing.valid(val)).length ===
						value.length,
				factory: (value) => new this(...value)
			}
		]);
	}
}

module.exports = GeometryPolygon;
