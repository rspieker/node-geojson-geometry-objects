/* global source, describe, it, each, expect */

const GeometryLineString = source('Geometry/LineString');

describe('Type', () => {
	describe('GeometryLineString', () => {
		const array = [[0, 1], [1, 2]];
		const bson = { type: 'LineString', coordinates: [[0, 1], [1, 2]] };
		const json = {
			type: 'LineString',
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
			const line = GeometryLineString.from(value);
			const json = line.toJSON();
			const bson = line.toBSON();

			expect(line).to.be.instanceOf(GeometryLineString);

			expect(bson.type).to.equal('LineString');
			expect(bson.coordinates).to.equal([[0, 1], [1, 2]]);
			expect(bson).to.equal({
				type: 'LineString',
				coordinates: [[0, 1], [1, 2]]
			});

			expect(json.type).to.equal('LineString');
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
			Empty object                        | ${{}}
			Object type: LineString             | ${{ type: 'LineString' }}
			Object type: NoLineString           | ${{ type: 'NoLineString' }}
			coordinates NULL                    | ${{
				type: 'LineString',
				coordinates: null
			}}
			coordinates [] (empty)              | ${{ type: 'LineString', coordinates: [] }}
			coordinates [1] (less than 2)       | ${{
				type: 'LineString',
				coordinates: [{ type: 'Point', latitude: 0, longitude: 1 }]
			}}
		`('not from $note', ({ value }, next) => {
			expect(() => GeometryLineString.from(value)).to.throw(
				/^GeometryLineString, cannot create from/
			);

			next();
		});
	});
});
