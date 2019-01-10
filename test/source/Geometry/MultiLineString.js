/* global source, describe, it, each, expect */

const GeometryMultiLineString = source('Geometry/MultiLineString');

describe('Type', () => {
	describe('GeometryMultiLineString', () => {
		const array = [[[0, 1], [1, 2]], [[3, 4], [4, 5]]];
		const bson = {
			type: 'MultiLineString',
			coordinates: [[[0, 1], [1, 2]], [[3, 4], [4, 5]]]
		};
		const json = {
			type: 'MultiLineString',
			coordinates: [
				[
					{ type: 'Point', longitude: 0, latitude: 1 },
					{ type: 'Point', longitude: 1, latitude: 2 }
				],
				[
					{ type: 'Point', longitude: 3, latitude: 4 },
					{ type: 'Point', longitude: 4, latitude: 5 }
				]
			]
		};

		each`
			note                     | value
			-------------------------|-------
			${JSON.stringify(array)} | ${array}
			${JSON.stringify(bson)}  | ${bson}
			${JSON.stringify(json)}  | ${json}
		`('from $note', ({ value }, next) => {
			const line = GeometryMultiLineString.from(value);
			const json = line.toJSON();
			const bson = line.toBSON();

			expect(line).to.be.instanceOf(GeometryMultiLineString);

			expect(bson.type).to.equal('MultiLineString');
			expect(bson.coordinates).to.equal([
				[[0, 1], [1, 2]],
				[[3, 4], [4, 5]]
			]);
			expect(bson).to.equal({
				type: 'MultiLineString',
				coordinates: [[[0, 1], [1, 2]], [[3, 4], [4, 5]]]
			});

			expect(json.type).to.equal('MultiLineString');
			expect(json.coordinates).to.equal([
				{
					type: 'LineString',
					coordinates: [
						{ type: 'Point', longitude: 0, latitude: 1 },
						{ type: 'Point', longitude: 1, latitude: 2 }
					]
				},
				{
					type: 'LineString',
					coordinates: [
						{ type: 'Point', longitude: 3, latitude: 4 },
						{ type: 'Point', longitude: 4, latitude: 5 }
					]
				}
			]);

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
			Object type: MultiLineString        | ${{ type: 'MultiLineString' }}
			Object type: NoMultiLineString      | ${{ type: 'NoMultiLineString' }}
			coordinates NULL                    | ${{
				type: 'MultiLineString',
				coordinates: null
			}}
			coordinates [] (empty)              | ${{
				type: 'MultiLineString',
				coordinates: []
			}}
			coordinates [1] (less than 2)       | ${{
				type: 'MultiLineString',
				coordinates: [{ type: 'Point', latitude: 0, longitude: 1 }]
			}}
		`('not from $note', ({ value }, next) => {
			expect(() => GeometryMultiLineString.from(value)).to.throw(
				/^GeometryMultiLineString, cannot create from/
			);

			next();
		});
	});
});
