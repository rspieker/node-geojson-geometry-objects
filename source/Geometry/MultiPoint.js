const GeometryPosition = require('./Position.js');
const GeometryPoint = require('./Point.js');

/**
 * GeoJSON MultiPoint
 *
 * @class GeometryMultiPoint
 * @extends {GeometryPosition}
 */
class GeometryMultiPoint extends GeometryPosition {
	/**
	 * Creates an instance of GeometryMultiPoint
	 *
	 * @param    {...GeometryPosition} points
	 * @memberof GeometryMultiPoint
	 */
	constructor(...points) {
		super(...points.map((point) => GeometryPoint.from(point)));
	}

	/**
	 * Obtain the type
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryMultiPoint
	 */
	static get type() {
		return 'MultiPoint';
	}

	/**
	 * Obtain the mappers used to validate and/or constructs
	 * (used by the static .from method)
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryMultiPoint
	 */
	static get rules() {
		return super.rules.concat([
			{
				validate: (value) =>
					value &&
					typeof value === 'object' &&
					value.type === this.type &&
					'coordinates' in value &&
					Array.isArray(value.coordinates) &&
					value.coordinates.length > 1 &&
					value.coordinates.filter((val) => GeometryPoint.valid(val))
						.length === value.coordinates.length,
				factory: (value) => new this(...value.coordinates)
			},
			{
				validate: (value) =>
					Array.isArray(value) &&
					value.length > 1 &&
					value.filter((val) => GeometryPoint.valid(val)).length ===
						value.length,
				factory: (value) => new this(...value)
			}
		]);
	}
}

module.exports = GeometryMultiPoint;
