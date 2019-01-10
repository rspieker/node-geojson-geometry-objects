/* global source, describe, it, each, expect */

const Position = source('Geometry/Position.js');
const Point = source('Geometry/Point.js');
const MultiPoint = source('Geometry/MultiPoint.js');
const LineString = source('Geometry/LineString.js');
const MultiLineString = source('Geometry/MultiLineString.js');
const Polygon = source('Geometry/Polygon.js');
const MultiPolygon = source('Geometry/MultiPolygon.js');
const GeometryCollection = source('Geometry/Collection.js');
const LinearRing = source('Geometry/LinearRing.js');
const Mapper = source('Mapper');

describe('exports', () => {
	const expected = {
		//  GeoJSON Abstract Position
		Position,

		//  GeoJSON types
		Point,
		MultiPoint,
		LineString,
		MultiLineString,
		Polygon,
		MultiPolygon,
		GeometryCollection,

		//  helpers
		Helper: {
			LinearRing,
			Mapper
		}
	};
	const exported = require('../../source/index.js');

	it('contains only GeoJSON, Position and helpers', (next) => {
		expect(Object.keys(exported)).to.equal(Object.keys(expected));
		expect(Object.keys(exported.Helper)).to.equal(
			Object.keys(expected.Helper)
		);

		next();
	});

	each`
		name               | type
		-------------------|------
		Position           | ${expected.Position}
		Point              | ${expected.Point}
		MultiPoint         | ${expected.MultiPoint}
		LineString         | ${expected.LineString}
		MultiLineString    | ${expected.MultiLineString}
		Polygon            | ${expected.Polygon}
		MultiPolygon       | ${expected.MultiPolygon}
		GeometryCollection | ${expected.GeometryCollection}
	`('exports $name', ({ name, type }, next) => {
		expect(exported[name]).to.equal(type);

		next();
	});

	each`
		name       | type
		-----------|------
		LinearRing | ${expected.Helper.LinearRing}
		Mapper     | ${expected.Helper.Mapper}
	`('exports helper $name', ({ name, type }, next) => {
		expect(exported.Helper[name]).to.equal(type);

		next();
	});
});
