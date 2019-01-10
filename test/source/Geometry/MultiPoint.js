/* global source, describe, it, each, expect */

const GeometryMultiPoint = source('Geometry/MultiPoint');

describe('Type', () => {
	describe('GeometryMultiPoint', () => {
		const array = [[0, 1], [1, 2]];
		const bson = { type: 'MultiPoint', coordinates: [[0, 1], [1, 2]] };
		const json = {
			type: 'MultiPoint',
			coordinates: [
				{ type: 'Point', longitude: 0, latitude: 1 },
				{ type: 'Point', longitude: 1, latitude: 2 }
			]
		};

		each`
			note                     | value
			-------------------------|-------
			${JSON.stringify(array)} | ${array}
			${JSON.stringify(bson)}  | ${bson}
			${JSON.stringify(json)}  | ${json}
		`('from $note', ({ value }, next) => {
			const line = GeometryMultiPoint.from(value);
			const json = line.toJSON();
			const bson = line.toBSON();

			expect(line).to.be.instanceOf(GeometryMultiPoint);

			expect(bson.type).to.equal('MultiPoint');
			expect(bson.coordinates).to.equal([[0, 1], [1, 2]]);
			expect(bson).to.equal({
				type: 'MultiPoint',
				coordinates: [[0, 1], [1, 2]]
			});

			expect(json.type).to.equal('MultiPoint');
			expect(json.coordinates).to.equal([
				{ type: 'Point', longitude: 0, latitude: 1 },
				{ type: 'Point', longitude: 1, latitude: 2 }
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
			Object type: MultiPoint             | ${{ type: 'MultiPoint' }}
			Object type: NoMultiPoint           | ${{ type: 'NoMultiPoint' }}
			coordinates NULL                    | ${{
				type: 'MultiPoint',
				coordinates: null
			}}
			coordinates [] (empty)              | ${{ type: 'MultiPoint', coordinates: [] }}
			coordinates [1] (less than 2)       | ${{
				type: 'MultiPoint',
				coordinates: [{ type: 'Point', latitude: 0, longitude: 1 }]
			}}
		`('not from $note', ({ value }, next) => {
				expect(() => GeometryMultiPoint.from(value)).to.throw(
					/^GeometryMultiPoint, cannot create from/
				);

				next();
			});
	});
});
