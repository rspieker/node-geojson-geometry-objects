const GeometryPosition = require('./Position.js');

/**
 * Geometry Point
 *
 * @class GeometryPoint
 * @extends {GeometryPosition}
 */
class GeometryPoint extends GeometryPosition {
	/**
	 * Creates an instance of GeometryPoint
	 *
	 * @param    Object { longitude, latitude, altitude }
	 * @memberof GeometryPoint
	 */
	constructor({ longitude, latitude, altitude } = {}) {
		super(
			...[longitude, latitude].concat(
				altitude !== undefined ? altitude : []
			)
		);
	}

	/**
	 * Obtain the latitude
	 *
	 * @readonly
	 * @memberof GeometryPoint
	 */
	get latitude() {
		const [, latitude] = this.coordinates;

		return latitude;
	}

	/**
	 * Obtain the longitude
	 *
	 * @readonly
	 * @memberof GeometryPoint
	 */
	get longitude() {
		const [longitude] = this.coordinates;

		return longitude;
	}

	/**
	 * Obtain the altitude (if any was provided, undefined otherwise)
	 *
	 * @readonly
	 * @memberof GeometryPoint
	 */
	get altitude() {
		const [, , altitude] = this.coordinates;

		return altitude;
	}

	/**
	 * Convert the Point to the JSON representation
	 *
	 * @returns  Object { type, longitude, latitude [, altitude] }
	 * @memberof GeometryPoint
	 */
	toJSON() {
		const { type, coordinates } = this;
		const [longitude, latitude, altitude] = coordinates;
		const basic = { type, latitude, longitude };

		return typeof altitude === 'undefined' ? basic : { ...basic, altitude };
	}

	/**
	 * Convert the Point to the BSON representation
	 *
	 * @returns  Object { type, coordinates }
	 * @memberof GeometryPoint
	 */
	toBSON() {
		const { type, coordinates } = this;

		return { type, coordinates };
	}

	/**
	 * Obtain the type
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryPoint
	 */
	static get type() {
		return 'Point';
	}

	/**
	 * Obtain the mappers used to validate and/or constructs
	 * (used by the static .from method)
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryPoint
	 */
	static get mapping() {
		return super.mapping.concat([
			{
				validate: (value) =>
					value &&
					typeof value === 'object' &&
					value.type === this.type &&
					'coordinates' in value &&
					Array.isArray(value.coordinates) &&
					value.coordinates.length >= 2,
				factory: (value) => {
					const [longitude, latitude, altitude] = value.coordinates;

					return new this({ longitude, latitude, altitude });
				}
			},
			{
				validate: (value) =>
					Array.isArray(value) &&
					value.length >= 2 &&
					typeof value[0] === 'number' &&
					typeof value[1] === 'number',
				factory: (value) => {
					const [longitude, latitude, altitude] = value;

					return new this({ longitude, latitude, altitude });
				}
			},
			{
				validate: (value) =>
					value &&
					typeof value === 'object' &&
					'longitude' in value &&
					'latitude' in value,
				factory: (value) => {
					const { longitude, latitude, altitude } = value;

					return new this({ longitude, latitude, altitude });
				}
			}
		]);
	}
}

module.exports = GeometryPoint;
