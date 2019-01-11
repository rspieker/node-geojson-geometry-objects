const GeometryPosition = require('./Position.js');
const GeometryLineString = require('./LineString.js');

/**
 * GeoJSON MultiLineString
 *
 * @class GeometryMultiLineString
 * @extends {GeometryPosition}
 */
class GeometryMultiLineString extends GeometryPosition {
	/**
	 * Creates an instance of GeometryMultiLineString
	 *
	 * @param    {...GeometryPosition} lines
	 * @memberof GeometryMultiLineString
	 */
	constructor(...lines) {
		super(...lines.map((line) => GeometryLineString.from(line)));
	}

	/**
	 * Obtain the type
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryMultiLineString
	 */
	static get type() {
		return 'MultiLineString';
	}

	/**
	 * Obtain the mappers used to validate and/or constructs
	 * (used by the static .from method)
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryMultiLineString
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
						GeometryLineString.valid(val)
					).length === value.coordinates.length,
				factory: (value) => new this(...value.coordinates)
			},
			{
				validate: (value) =>
					value &&
					Array.isArray(value) &&
					value.length > 0 &&
					value.filter((val) => GeometryLineString.valid(val))
						.length === value.length,
				factory: (value) => new this(...value)
			}
		]);
	}
}

module.exports = GeometryMultiLineString;
