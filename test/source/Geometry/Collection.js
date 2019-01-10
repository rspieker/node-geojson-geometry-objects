/* global source, describe, it, each, expect */

const GeometryCollection = source('Geometry/Collection');

describe('Type', () => {
	describe('GeometryCollection', () => {
		const test = require('../../data/types.js');

		each`
			note                          | catalog | types
			------------------------------|---------|------------
			Point                         | array   | ${[test.Point]}
			Point                         | json    | ${[test.Point]}
			Point                         | bson    | ${[test.Point]}
			MultiPoint                    | json    | ${[test.MultiPoint]}
			MultiPoint                    | bson    | ${[test.MultiPoint]}
			MultiPoint, Point             | json    | ${[test.MultiPoint, test.Point]}
			MultiPoint, Point             | bson    | ${[test.MultiPoint, test.Point]}
			LineString                    | array   | ${[test.LineString]}
			LineString                    | json    | ${[test.LineString]}
			LineString                    | bson    | ${[test.LineString]}
			LineString, Point             | array   | ${[test.LineString, test.Point]}
			LineString, Point             | json    | ${[test.LineString, test.Point]}
			LineString, Point             | bson    | ${[test.LineString, test.Point]}
			MultiPoint, LineString, Point | json    | ${[
				test.MultiPoint,
				test.LineString,
				test.Point
			]}
			MultiPoint, LineString, Point | bson    | ${[
				test.MultiPoint,
				test.LineString,
				test.Point
			]}
			MultiLineString               | array   | ${[test.MultiLineString]}
			MultiLineString               | json    | ${[test.MultiLineString]}
			MultiLineString               | bson    | ${[test.MultiLineString]}
			MultiLineString, Point        | array   | ${[test.MultiLineString, test.Point]}
			MultiLineString, Point        | json    | ${[test.MultiLineString, test.Point]}
			MultiLineString, Point        | bson    | ${[test.MultiLineString, test.Point]}
			MultiLineString, LineString, Point | array   | ${[
				test.MultiLineString,
				test.LineString,
				test.Point
			]}
			MultiLineString, LineString, Point | json    | ${[
				test.MultiLineString,
				test.LineString,
				test.Point
			]}
			MultiLineString, LineString, Point | bson    | ${[
				test.MultiLineString,
				test.LineString,
				test.Point
			]}
		`('supports $note ($catalog)', ({ catalog, types }, next) => {
			const base = { type: 'GeometryCollection' };
			const collection = GeometryCollection.from({
				...base,
				geometries: types.map((type) => type[catalog])
			});
			const json = [];
			const bson = [];

			expect(collection).to.be.instanceOf(GeometryCollection);
			expect(collection.type).to.equal('GeometryCollection');
			expect(collection.geometries).to.be.array();
			expect(collection.geometries).to.have.length(types.length);

			types.forEach((type, index) => {
				const current = collection.geometries[index];

				expect(current).to.be.instanceOf(type.class);
				expect(current.toJSON()).to.equal(type.json);
				expect(current.toBSON()).to.equal(type.bson);

				json.push(current.toJSON());
				bson.push(current.toBSON());
			});

			expect(collection.toJSON()).to.equal({ ...base, geometries: json });
			expect(collection.toBSON()).to.equal({ ...base, geometries: bson });

			next();
		});

		each`
			note                                | value
			------------------------------------|-------
			NULL                                | ${null}
			Boolean false                       | ${false}
			Boolean true                        | ${true}
			Empty array                         | ${[]}
			Empty object                        | ${{}}
			Object type: GeometryCollection     | ${{ type: 'GeometryCollection' }}
			Object type: NoGeometryCollection   | ${{ type: 'NoGeometryCollection' }}
			geometries NULL                     | ${{
				type: 'GeometryCollection',
				geometries: null
			}}
		`('not from $note', ({ value }, next) => {
			expect(() => GeometryCollection.from(value)).to.throw(
				/^GeometryCollection, cannot create from/
			);

			next();
		});
	});
});
