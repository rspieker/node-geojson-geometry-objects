/* global source, describe, it, each, expect */

const GeometryPosition = source('Geometry/Position');

describe('Type', () => {
	describe('GeometryPosition', () => {
		it('has static type "Position"', (next) => {
			expect(GeometryPosition.type).to.equal('Position');

			next();
		});

		it('is not a mappable type', (next) => {
			expect(() => GeometryPosition.from([[0, 1]])).to.throw(
				/^GeometryPosition, cannot create from/
			);

			next();
		});

		describe('it constructs', () => {
			const longitude = 1;
			const latitude = 2;
			const altitude = 3;

			it('without altitude', (next) => {
				const position = new GeometryPosition({ longitude, latitude });
				const json = position.toJSON();
				const bson = position.toBSON();

				expect(position).to.be.instanceOf(GeometryPosition);
				expect(position.coordinates).to.equal([longitude, latitude]);
				expect(position.longitude).to.equal(longitude);
				expect(position.latitude).to.equal(latitude);
				expect(position.altitude).to.be.undefined();

				expect(json.type).to.equal('Position');
				expect(json.longitude).to.equal(longitude);
				expect(json.latitude).to.equal(latitude);
				expect(json.altitude).to.be.undefined();
				expect(json.coordinates).to.be.undefined();

				expect(bson.type).to.equal('Position');
				expect(bson.longitude).to.be.undefined();
				expect(bson.latitude).to.be.undefined();
				expect(bson.altitude).to.be.undefined();
				expect(bson.coordinates).to.equal([1, 2]);

				next();
			});

			it('with altitude', (next) => {
				const position = new GeometryPosition({
					longitude,
					latitude,
					altitude
				});
				const json = position.toJSON();
				const bson = position.toBSON();

				expect(position).to.be.instanceOf(GeometryPosition);
				expect(position.coordinates).to.equal([
					longitude,
					latitude,
					altitude
				]);
				expect(position.longitude).to.equal(longitude);
				expect(position.latitude).to.equal(latitude);
				expect(position.altitude).to.equal(altitude);

				expect(json.type).to.equal('Position');
				expect(json.longitude).to.equal(longitude);
				expect(json.latitude).to.equal(latitude);
				expect(json.altitude).to.equal(altitude);
				expect(json.coordinates).to.be.undefined();

				expect(bson.type).to.equal('Position');
				expect(bson.longitude).to.be.undefined();
				expect(bson.latitude).to.be.undefined();
				expect(bson.altitude).to.be.undefined();
				expect(bson.coordinates).to.equal([1, 2, 3]);

				next();
			});
		});
	});
});
