const GeometryPosition = require('./Position.js');

class GeometryPoint extends GeometryPosition {
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
