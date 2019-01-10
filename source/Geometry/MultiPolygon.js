const GeometryPosition = require('./Position.js');
const GeometryPolygon = require('./Polygon.js');

class GeometryMultiPolygon extends GeometryPosition {
	constructor(...polygons) {
		super(...polygons.map((poly) => GeometryPolygon.from(poly)));
	}

	static get type() {
		return 'MultiPolygon';
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
					value.coordinates.filter((val) =>
						GeometryPolygon.valid(val)
					).length === value.coordinates.length,
				factory: (value) => new this(...value.coordinates)
			},
			{
				validate: (value) =>
					value &&
					Array.isArray(value) &&
					value.length > 0 &&
					value.filter((val) => GeometryPolygon.valid(val)).length ===
						value.length,
				factory: (value) => new this(...value)
			}
		]);
	}
}

module.exports = GeometryMultiPolygon;
