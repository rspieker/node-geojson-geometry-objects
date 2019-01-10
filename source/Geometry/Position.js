const GeometryObject = require('./Object.js');

const storage = new WeakMap();

class GeometryPosition extends GeometryObject {
	constructor(...coordinates) {
		super();

		storage.set(this, { coordinates });
	}

	get coordinates() {
		const { coordinates } = storage.get(this);

		return coordinates;
	}

	toBSON() {
		const { type, coordinates: items } = this;
		const coordinates = items.map((item) => item.toBSON().coordinates);

		return { type, coordinates };
	}

	toJSON() {
		const { type, coordinates: items } = this;
		const coordinates = items.map((item) => item.toJSON());

		return { type, coordinates };
	}
}

module.exports = GeometryPosition;
