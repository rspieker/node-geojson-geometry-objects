const GeometryObject = require('./Object.js');
const GeometryTypeError = require('./TypeError.js');

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

		const invalid = coordinates.filter(
			(geo) =>
				!(geo instanceof GeometryPosition || typeof geo === 'number')
		);

		if (invalid.length) {
			throw new GeometryTypeError('Invalid coordinate types', invalid);
		}

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
		const coordinates = items.map((item) =>
			item instanceof GeometryPosition ? item.toBSON().coordinates : item
		);

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
		const coordinates = items.map((item) =>
			item instanceof GeometryPosition ? item.toJSON() : item
		);

		return { type, coordinates };
	}
}

module.exports = GeometryPosition;
