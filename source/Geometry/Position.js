const GeometryObject = require('./Object.js');

class GeometryPosition extends GeometryObject {
	constructor({ longitude, latitude, altitude } = {}) {
		const coordinates = [longitude, latitude];

		if (altitude !== undefined) {
			coordinates.push(altitude);
		}

		super({ coordinates });
	}

	get latitude() {
		const [, latitude] = this.coordinates;

		return latitude;
	}

	get longitude() {
		const [longitude] = this.coordinates;

		return longitude;
	}

	get altitude() {
		const [, , altitude] = this.coordinates;

		return altitude;
	}

	toJSON() {
		const { type, coordinates } = this;
		const [longitude, latitude, altitude] = coordinates;
		const basic = { type, latitude, longitude };

		return typeof altitude === 'undefined' ? basic : { ...basic, altitude };
	}

	toBSON() {
		const { type, coordinates } = this;

		return { type, coordinates };
	}

	static get type() {
		return 'Position';
	}
}

module.exports = GeometryPosition;
