const GeometryObject = require('./Object.js');

class GeometryPoint extends GeometryObject {
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
		return 'Point';
	}

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
