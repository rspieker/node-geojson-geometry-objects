const GeometryPosition = require('./Position.js');
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

/**
 * GeoJSON GeometryCollection
 *
 * @class GeometryCollection
 * @extends {GeometryPosition}
 */
class GeometryCollection extends GeometryPosition {
	/**
	 * Creates an instance of GeometryCollection
	 *
	 * @param    {...GeometryPosition} geometries
	 * @memberof GeometryCollection
	 */
	constructor(...geometries) {
		super(...geometries.map((geometry) => mapper.map(geometry)));
	}

	/**
	 * Obtain the geometries
	 *
	 * @readonly
	 * @memberof GeometryCollection
	 */
	get geometries() {
		return super.coordinates;
	}

	/**
	 * Convert the GeometryCollection to the JSON representation
	 *
	 * @returns  Object { type, geometries }
	 * @memberof GeometryCollection
	 */
	toJSON() {
		const { type, coordinates: geometries } = super.toJSON();

		return { type, geometries };
	}

	/**
	 * Convert the GeometryCollection to the BSON representation
	 *
	 * @returns  Object { type, coordinates }
	 * @memberof GeometryCollection
	 */
	toBSON() {
		const { type, coordinates } = this;
		const geometries = coordinates.map((coordinate) => coordinate.toBSON());

		return { type, geometries };
	}

	/**
	 * Obtain the type
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryCollection
	 */
	static get type() {
		return 'GeometryCollection';
	}

	/**
	 * Obtain the mappers used to validate and/or constructs
	 * (used by the static .from method)
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryCollection
	 */
	static get rules() {
		return super.rules.concat([
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
