const GeometryObject = require('./Object.js');
const GeometryLineString = require('./LineString.js');
const GeometryMultiLineString = require('./MultiLineString.js');
const GeometryMultiPoint = require('./MultiPoint.js');
const GeometryMultiPolygon = require('./MultiPolygon.js');
const GeometryPoint = require('./Point.js');
const GeometryPolygon = require('./Polygon.js');
const Mapper = require('../Mapper.js');

const mapper = new Mapper(
	GeometryMultiPolygon,
	GeometryPolygon,
	GeometryMultiLineString,
	GeometryLineString,
	GeometryMultiPoint,
	GeometryPoint
);

class GeometryCollection extends GeometryObject {
	constructor(...geometries) {
		super({
			coordinates: geometries.map((geometry) => mapper.map(geometry))
		});
	}

	get geometries() {
		return super.coordinates;
	}

	toJSON() {
		const { type, coordinates: geometries } = super.toJSON();

		return { type, geometries };
	}

	toBSON() {
		const { type, coordinates } = this;
		const geometries = coordinates.map((coordinate) => coordinate.toBSON());

		return { type, geometries };
	}

	static get type() {
		return 'GeometryCollection';
	}

	static get mapping() {
		return super.mapping.concat([
			{
				validate: (value) =>
					value &&
					typeof value === 'object' &&
					value.type === this.type &&
					'geometries' in value &&
					Array.isArray(value.geometries) &&
					value.geometries.filter((val) => mapper.valid(val))
						.length === value.geometries.length,
				factory: (value) => new this(...value.geometries)
			}
		]);
	}
}

module.exports = GeometryCollection;
