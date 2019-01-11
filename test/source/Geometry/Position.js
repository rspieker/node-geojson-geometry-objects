/* global source, describe, it, each, expect */

const GeometryPosition = source('Geometry/Position');
const GeometryTypeError = source('Geometry/TypeError');

describe('Type', () => {
	describe('GeometryPosition', () => {
		const test = [
			{ value: 1, bson: 1, json: 1 },
			{ value: 2, bson: 2, json: 2 },
			{
				value: new GeometryPosition(1),
				bson: [1],
				json: { type: 'Position', coordinates: [1] }
			},
			{
				value: new GeometryPosition(2),
				bson: [2],
				json: { type: 'Position', coordinates: [2] }
			}
		];
		each`
			type                | values
			--------------------|--------
			number              | ${test.slice(0, 2)}
			Position            | ${test.slice(2)}
			number and Position | ${test.slice(1, 3)}
		`('construct using $type', ({ values }, next) => {
			const param = values.map((item) => item.value);
			const position = new GeometryPosition(...param);

			expect(position.type).to.equal('Position');
			expect(position.coordinates).to.equal([...param]);
			expect(position.toBSON()).to.equal({
				type: 'Position',
				coordinates: values.map((item) => item.bson)
			});
			expect(position.toJSON()).to.equal({
				type: 'Position',
				coordinates: values.map((item) => item.json)
			});

			next();
		});

		each`
			type    | values
			--------|--------
			string  | ${['foo', 'bar']}
			boolean | ${[true, false]}
			object  | ${[{}]}
		`('does not construct using $type', ({ values }, next) => {
			expect(() => new GeometryPosition(...values)).to.throw(
				GeometryTypeError
			);

			next();
		});
	});
});
