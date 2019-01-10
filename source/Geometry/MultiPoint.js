const GeometryObject = require('./Object.js');
const GeometryPoint = require('./Point.js');

class GeometryMultiPoint extends GeometryObject {
	constructor(...points) {
		super({
			coordinates: points.map((point) => GeometryPoint.from(point))
		});
	}

	static get type() {
		return 'MultiPoint';
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
