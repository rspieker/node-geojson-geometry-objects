const GeometryObject = require('./Object.js');
const LinearRing = require('./LinearRing.js');

class GeometryPolygon extends GeometryObject {
	constructor(...rings) {
		super({ coordinates: rings.map((ring) => LinearRing.from(ring)) });
	}

	static get type() {
		return 'Polygon';
	}

	static get mapping() {
		return super.mapping.concat([
			{
				validate: (value) =>
					value &&
					typeof value === 'object' &&
					value.type === this.type &&
					Array.isArray(value.coordinates) &&
					value.coordinates.length > 0 &&
					value.coordinates.filter((val) => LinearRing.valid(val))
						.length === value.coordinates.length,
				factory: (value) => new this(...value.coordinates)
			},
			{
				validate: (value) =>
					value &&
					Array.isArray(value) &&
					value.length > 0 &&
					value.filter((val) => LinearRing.valid(val)).length ===
						value.length,
				factory: (value) => new this(...value)
			}
		]);
	}
}

module.exports = GeometryPolygon;
