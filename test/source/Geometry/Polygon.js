/* global source, describe, it, each, expect */

const GeometryPolygon = source('Geometry/Polygon');

describe('Type', () => {
	describe('GeometryPolygon', () => {
		const array = [[[0, 0], [0, 2], [1, 1], [0, 0]]];
		const bson = { type: 'Polygon', coordinates: array };
		const json = {
			type: 'Polygon',
			coordinates: [
				{
					type: 'LinearRing',
					coordinates: [
						{ type: 'Point', longitude: 0, latitude: 0 },
						{ type: 'Point', longitude: 0, latitude: 2 },
						{ type: 'Point', longitude: 1, latitude: 1 },
						{ type: 'Point', longitude: 0, latitude: 0 }
					]
				}
			]
		};

		each`
			note                     | value
			-------------------------|----------
			${JSON.stringify(array)} | ${array}
			${JSON.stringify(bson)}  | ${bson}
			${JSON.stringify(json)}  | ${json}
		`('from $note', ({ value }, next) => {
			const poly = GeometryPolygon.from(value);
			const json = poly.toJSON();
			const bson = poly.toBSON();

			expect(poly).to.be.instanceOf(GeometryPolygon);

			expect(bson.type).to.equal('Polygon');
			expect(bson.coordinates).to.equal([
				[[0, 0], [0, 2], [1, 1], [0, 0]]
			]);
			expect(bson).to.equal({
				type: 'Polygon',
				coordinates: [[[0, 0], [0, 2], [1, 1], [0, 0]]]
			});

			expect(json.type).to.equal('Polygon');
			expect(json.coordinates).to.equal([
				{
					type: 'LinearRing',
					coordinates: [
						{ type: 'Point', longitude: 0, latitude: 0 },
						{ type: 'Point', longitude: 0, latitude: 2 },
						{ type: 'Point', longitude: 1, latitude: 1 },
						{ type: 'Point', longitude: 0, latitude: 0 }
					]
				}
			]);

			next();
		});

		each`
			note                             | value
			---------------------------------|-------
			NULL                             | ${null}
			Boolean false                    | ${false}
			Boolean true                     | ${true}
			Empty array                      | ${[]}
			Empty object                     | ${{}}
			Object type: Polygon             | ${{ type: 'Polygon' }}
			Object type: NoPolygon           | ${{ type: 'NoPolygon' }}
			coordinates NULL                 | ${{
				type: 'Polygon',
				coordinates: null
			}}
			coordinates [] (empty)          | ${{ type: 'Polygon', coordinates: [] }}
			invalid "ring" (one point)      | ${[[[0, 1]]]}
			invalid "ring" (two points)     | ${[[[0, 1], [0, 2]]]}
			invalid "ring" (three points)   | ${[[[0, 1], [0, 2], [1, 2]]]}
			invalid "ring" (first != start) | ${[[[0, 1], [0, 2], [1, 2], [1, 1]]]}
		`('not from $note', ({ value }, next) => {
			expect(() => GeometryPolygon.from(value)).to.throw(
				/^GeometryPolygon, cannot create from/
			);

			next();
		});
	});
});
