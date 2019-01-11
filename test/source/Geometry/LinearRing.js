/* global source, describe, it, each, expect */

const LinearRing = source('Geometry/LinearRing');

describe('Type', () => {
	describe('LinearRing', () => {
		const array = [[0, 0], [0, 2], [1, 1], [0, 0]];
		const bson = { type: 'LinearRing', coordinates: array };
		const json = {
			type: 'LinearRing',
			coordinates: [
				{ type: 'Point', longitude: 0, latitude: 0 },
				{ type: 'Point', longitude: 0, latitude: 2 },
				{ type: 'Point', longitude: 1, latitude: 1 },
				{ type: 'Point', longitude: 0, latitude: 0 }
			]
		};
		const bson2 = Object.assign(bson, { type: 'LineString' });
		const json2 = Object.assign(json, { type: 'LineString' });

		each`
			note                     | value
			-------------------------|----------
			${JSON.stringify(array)} | ${array}
			${JSON.stringify(bson)}  | ${bson}
			${JSON.stringify(json)}  | ${json}
			${JSON.stringify(bson2)} | ${bson2}
			${JSON.stringify(json2)} | ${json2}
		`('from $note', ({ value, latitude, longitude }, next) => {
			const line = LinearRing.from(value);
			const json = line.toJSON();
			const bson = line.toBSON();

			expect(line).to.be.instanceOf(LinearRing);

			expect(bson.type).to.equal('LinearRing');
			expect(bson.coordinates).to.equal([[0, 0], [0, 2], [1, 1], [0, 0]]);
			expect(bson).to.equal({
				type: 'LinearRing',
				coordinates: [[0, 0], [0, 2], [1, 1], [0, 0]]
			});

			expect(json.type).to.equal('LinearRing');
			expect(json.coordinates).to.equal([
				{ type: 'Point', longitude: 0, latitude: 0 },
				{ type: 'Point', longitude: 0, latitude: 2 },
				{ type: 'Point', longitude: 1, latitude: 1 },
				{ type: 'Point', longitude: 0, latitude: 0 }
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
			Array(1) (less than 4)              | ${[[0, 0]]}
			Array(2) (less than 4)              | ${[[0, 0], [0, 1]]}
			Array(3) (less than 4)              | ${[[0, 0], [0, 1], [1, 1]]}
			Array(4) (1 != 4)                   | ${[[0, 0], [0, 1], [1, 1], [1, 0]]}
			Array(4) (invalid points)           | ${[[0], [0], [1], [1]]}
			Empty object                        | ${{}}
			Object type: LinearRing             | ${{ type: 'LinearRing' }}
			Object type: NoLinearRing           | ${{ type: 'NoLinearRing' }}
			coordinates NULL                    | ${{
				type: 'LinearRing',
				coordinates: null
			}}
			coordinates [] (empty)              | ${{ type: 'LinearRing', coordinates: [] }}
			coordinates [1] (less than 4)       | ${{
				type: 'LinearRing',
				coordinates: [{ type: 'Point', latitude: 0, longitude: 0 }]
			}}
			coordinates [1,2] (less than 4)     | ${{
				type: 'LinearRing',
				coordinates: [
					{ type: 'Point', latitude: 0, longitude: 0 },
					{ type: 'Point', latitude: 0, longitude: 1 }
				]
			}}
			coordinates [1,2,3] (less than 4)  | ${{
				type: 'LinearRing',
				coordinates: [
					{ type: 'Point', latitude: 0, longitude: 0 },
					{ type: 'Point', latitude: 0, longitude: 1 },
					{ type: 'Point', latitude: 1, longitude: 1 }
				]
			}}
			coordinates [1,2,3,4] (1 != 4)     | ${{
				type: 'LinearRing',
				coordinates: [
					{ type: 'Point', latitude: 0, longitude: 0 },
					{ type: 'Point', latitude: 0, longitude: 1 },
					{ type: 'Point', latitude: 1, longitude: 1 },
					{ type: 'Point', latitude: 1, longitude: 0 }
				]
			}}
			coordinates [1,2,3,4] (invalid points) | ${{
				type: 'LinearRing',
				coordinates: [
					{ type: 'Point', latitude: 0, longitude: 0 },
					{ type: 'Point', latitude: 0, longitude: 1 },
					{ type: 'Point', latitude: 1 },
					{ type: 'Point', latitude: 1, longitude: 0 }
				]
			}}
		`('not from $note', ({ value }, next) => {
			expect(() => LinearRing.from(value)).to.throw(
				/^LinearRing, cannot create from/
			);

			next();
		});
	});
});
