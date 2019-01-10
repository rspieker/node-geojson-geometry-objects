const GeometryPoint = require('./Point.js');
const GeometryLineString = require('./LineString.js');

/**
 * Linear Ring object, as used by GeoJSON Polygon
 * (this is not a GeoJSON object in itself, use GeometryLineString)
 *
 * @class LinearRing
 * @extends {GeometryLineString}
 */
class LinearRing extends GeometryLineString {
	/**
	 * Obtain the type (used by mapping not represented in as GeoJSON, JSON
	 * or BSON type)
	 *
	 * @readonly
	 * @static
	 * @memberof LineString
	 */
	static get type() {
		return 'LinearRing';
	}

	/**
	 * Obtain the mappers used to validate and/or constructs
	 * (used by the static .from method)
	 *
	 * @readonly
	 * @static
	 * @memberof LinearRing
	 */
	static get mapping() {
		const compare = (list) => {
			const { coordinates: first } = GeometryPoint.from(list[0]);
			const { coordinates: last } = GeometryPoint.from(
				list[list.length - 1]
			);

			return first[0] === last[0] && first[1] === last[1];
		};

		return [
			{
				validate: (value) =>
					value &&
					typeof value === 'object' &&
					(value.type === this.type || value.type === 'LineString') &&
					'coordinates' in value &&
					Array.isArray(value.coordinates) &&
					value.coordinates.length > 3 &&
					value.coordinates.filter((val) => GeometryPoint.valid(val))
						.length === value.coordinates.length &&
					compare(value.coordinates),
				factory: (value) => new this(...value.coordinates)
			},
			{
				validate: (value) =>
					Array.isArray(value) &&
					value.length > 3 &&
					value.filter((val) => GeometryPoint.valid(val)).length ===
						value.length &&
					compare(value),
				factory: (value) => new this(...value)
			}
		];
	}
}

module.exports = LinearRing;
