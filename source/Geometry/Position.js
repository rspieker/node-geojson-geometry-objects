const GeometryObject = require('./Object.js');

const storage = new WeakMap();

/**
 * GeoJSON generic Position object, providing coordinates
 *
 * @class GeometryPosition
 * @extends {GeometryObject}
 */
class GeometryPosition extends GeometryObject {
	/**
	 * Creates an instance of GeometryPosition

	 * @param {*} coordinates
	 * @memberof GeometryPosition
	 */
	constructor(...coordinates) {
		super();

		storage.set(this, { coordinates });
	}

	/**
	 * Obtain the coordinates stored with the Position
	 *
	 * @readonly
	 * @memberof GeometryPosition
	 */
	get coordinates() {
		const { coordinates } = storage.get(this);

		return coordinates;
	}

	/**
	 * Convert the Position to the BSON representation
	 *
	 * @returns  Object { type, coordinates }
	 * @memberof GeometryPosition
	 */
	toBSON() {
		const { type, coordinates: items } = this;
		const coordinates = items.map((item) => item.toBSON().coordinates);

		return { type, coordinates };
	}

	/**
	 * Convert the Position to the JSON representation
	 *
	 * @returns  Object { type, coordinates }
	 * @memberof GeometryPosition
	 */
	toJSON() {
		const { type, coordinates: items } = this;
		const coordinates = items.map((item) => item.toJSON());

		return { type, coordinates };
	}
}

module.exports = GeometryPosition;
