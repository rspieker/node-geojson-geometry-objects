/* global source, describe, it, each, expect */

const GeometryMultiPolygon = source('Geometry/MultiPolygon');

describe('Type', () => {
	describe('GeometryMultiPolygon', () => {
		const array = [
			[[[0, 0], [0, 2], [1, 1], [0, 0]]],
			[[[1, 1], [1, 3], [2, 2], [1, 1]]]
		];
		const bson = { type: 'MultiPolygon', coordinates: array };
		const json = {
			type: 'MultiPolygon',
			coordinates: [
				{
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
				},
				{
					type: 'Polygon',
					coordinates: [
						{
							type: 'LinearRing',
							coordinates: [
								{ type: 'Point', longitude: 1, latitude: 1 },
								{ type: 'Point', longitude: 1, latitude: 3 },
								{ type: 'Point', longitude: 2, latitude: 2 },
								{ type: 'Point', longitude: 1, latitude: 1 }
							]
						}
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
			const poly = GeometryMultiPolygon.from(value);
			const json = poly.toJSON();
			const bson = poly.toBSON();

			expect(poly).to.be.instanceOf(GeometryMultiPolygon);

			expect(bson.type).to.equal('MultiPolygon');
			expect(bson.coordinates).to.equal([
				[[[0, 0], [0, 2], [1, 1], [0, 0]]],
				[[[1, 1], [1, 3], [2, 2], [1, 1]]]
			]);
			expect(bson).to.equal({
				type: 'MultiPolygon',
				coordinates: [
					[[[0, 0], [0, 2], [1, 1], [0, 0]]],
					[[[1, 1], [1, 3], [2, 2], [1, 1]]]
				]
			});

			expect(json.type).to.equal('MultiPolygon');
			expect(json.coordinates).to.equal([
				{
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
				},
				{
					type: 'Polygon',
					coordinates: [
						{
							type: 'LinearRing',
							coordinates: [
								{ type: 'Point', longitude: 1, latitude: 1 },
								{ type: 'Point', longitude: 1, latitude: 3 },
								{ type: 'Point', longitude: 2, latitude: 2 },
								{ type: 'Point', longitude: 1, latitude: 1 }
							]
						}
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
			Object type: MultiPolygon        | ${{ type: 'MultiPolygon' }}
			Object type: NoMultiPolygon      | ${{ type: 'NoMultiPolygon' }}
			coordinates NULL                 | ${{
				type: 'MultiPolygon',
				coordinates: null
			}}
			coordinates [] (empty)          | ${{ type: 'MultiPolygon', coordinates: [] }}
			invalid "ring" (one point)      | ${[[[0, 1]]]}
			invalid "ring" (two points)     | ${[[[0, 1], [0, 2]]]}
			invalid "ring" (three points)   | ${[[[0, 1], [0, 2], [1, 2]]]}
			invalid "ring" (first != start) | ${[[[0, 1], [0, 2], [1, 2], [1, 1]]]}
		`('not from $note', ({ value }, next) => {
			expect(() => GeometryMultiPolygon.from(value)).to.throw(
				/^GeometryMultiPolygon, cannot create from/
			);

			next();
		});
	});
});
