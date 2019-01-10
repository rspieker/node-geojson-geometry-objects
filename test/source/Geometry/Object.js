/* global source, describe, it, each, expect */

const GeometryObject = source('Geometry/Object');

describe('Type', () => {
	describe('GeometryObject', () => {
		it('has static type "Object"', (next) => {
			expect(GeometryObject.type).to.equal('Object');

			next();
		});
	});
});
