/* global source, describe, it, each, expect */

const Mapper = source('Mapper');
const GeometryObject = source('Geometry/Object.js');
const Point = source('Geometry/Point.js');
const MultiPoint = source('Geometry/MultiPoint.js');
const LineString = source('Geometry/LineString.js');
const MultiLineString = source('Geometry/MultiLineString.js');
const LinearRing = source('Geometry/LinearRing.js');
const Polygon = source('Geometry/Polygon.js');
const MultiPolygon = source('Geometry/MultiPolygon.js');
const GeometryCollection = source('Geometry/Collection.js');

describe('Mapper', () => {
	describe('Construction', () => {
		each`
			note                        | support
			----------------------------|---------
			nothing (useless at it is)  | ${[]}
			Point                       | ${[Point]}
			MultiPoint                  | ${[MultiPoint]}
			LineString                  | ${[LineString]}
			MultiLineString             | ${[MultiLineString]}
			Polygon                     | ${[Polygon]}
			MultiPolygon                | ${[MultiPolygon]}
			GeometryCollection          | ${[GeometryCollection]}
			combined - all              | ${[
				Point,
				MultiPoint,
				LineString,
				MultiLineString,
				Polygon,
				MultiPolygon,
				GeometryCollection
			]}
			Point - extend              | ${[class extends Point {}]}
			MultiPoint - extend         | ${[class extends MultiPoint {}]}
			LineString - extend         | ${[class extends LineString {}]}
			MultiLineString - extend    | ${[class extends MultiLineString {}]}
			Polygon - extend            | ${[class extends Polygon {}]}
			MultiPolygon - extend       | ${[class extends MultiPolygon {}]}
			GeometryCollection - extend | ${[class extends GeometryCollection {}]}
		`('allows for $note', ({ support }, next) => {
			expect(() => new Mapper(...support)).not.to.throw();

			next();
		});

		each`
			note               | support
			-------------------|-------
			NULL               | ${[null]}
			undefined          | ${[undefined]}
			true               | ${[true]}
			false              | ${[false]}
			'foo'              | ${['foo']}
			1                  | ${[1]}
			Array              | ${[[]]}
			Object {}          | ${[{}]}
			Object {foo:'bar'} | ${[{ foo: 'bar' }]}
			Object {name:'hi'} | ${[{ name: 'hi' }]}
			class              | ${[class Foo {}]}
			function           | ${[function foo() {}]}
			function (arrow)   | ${[() => {}]}
			Object             | ${[GeometryObject]}
		`('does not allow for $note', ({ support }, next) => {
			expect(() => new Mapper(...support)).to.throw(/^Cannot map type/);

			next();
		});
	});

	describe('Mapping', () => {
		each`
			note                 | support         | allow               | deny
			---------------------|-----------------|---------------------|------
			Point not MultiPoint | ${[Point]}      | ${[0, 1]}           | ${[
			[0, 1],
			[0, 2]
		]}
			MultiPoint not Point | ${[MultiPoint]} | ${[[0, 1], [0, 2]]} | ${[0, 1]}
		`('maps $note', ({ support, allow, deny }, next) => {
			const mapper = new Mapper(...support);

			expect(() => mapper.map(allow)).not.to.throw();
			expect(() => mapper.map(deny)).to.throw(/^Mapper cannot map/);

			next();
		});
	});
});
