/* global source, describe, it, each, expect */

const GeometryPoint = source('Geometry/Point');

describe('Type', () => {
	describe('GeometryPoint (no altitude)', () => {
		const array = [1, 2];
		const bson = { type: 'Point', coordinates: [1, 2] };
		const json = { latitude: 2, longitude: 1 };

		each`
			note                     | value    | latitude | longitude
			-------------------------|----------|----------|-----------
			${JSON.stringify(array)} | ${array} | ${2}     | ${1}
			${JSON.stringify(bson)}  | ${bson}  | ${2}     | ${1}
			${JSON.stringify(json)}  | ${json}  | ${2}     | ${1}
		`('from $note', ({ value, latitude, longitude }, next) => {
			const point = GeometryPoint.from(value);
			const json = point.toJSON();
			const bson = point.toBSON();

			expect(point).to.be.instanceOf(GeometryPoint);
			expect(point.coordinates).to.equal([longitude, latitude]);
			expect(point.longitude).to.equal(longitude);
			expect(point.altitude).to.be.undefined();
			expect(point.latitude).to.equal(latitude);

			expect(json.type).to.equal('Point');
			expect(json.longitude).to.equal(longitude);
			expect(json.latitude).to.equal(latitude);
			expect(json.altitude).to.be.undefined();
			expect(json.coordinates).to.be.undefined();

			expect(bson.type).to.equal('Point');
			expect(bson.longitude).to.be.undefined();
			expect(bson.latitude).to.be.undefined();
			expect(bson.altitude).to.be.undefined();
			expect(bson.coordinates).to.equal([1, 2]);

			next();
		});

		each`
			value                                         | note
			----------------------------------------------|------
			${null}                                       | NULL
			${false}                                      | Boolean false
			${true}                                       | Boolean true
			${{}}                                         | Empty object
			${{ type: 'Point' }}                          | Object type: Point
			${{ type: 'NoPoint' }}                        | Object type: NoPoint
			${{ type: 'Point', coordinates: null }}       | coordinates NULL
			${{ type: 'Point', coordinates: [] }}         | coordinates [] (empty)
			${{ type: 'Point', coordinates: [1] }}        | coordinates [1] (less than 2)
		`('not from $note', ({ value }, next) => {
			expect(() => GeometryPoint.from(value)).to.throw(
				/^GeometryPoint, cannot create from/
			);

			next();
		});
	});

	describe('GeometryPoint (altitude)', () => {
		const array = [1, 2, 3];
		const bson = { type: 'Point', coordinates: [1, 2, 3] };
		const json = { latitude: 2, longitude: 1, altitude: 3 };

		each`
			note                     | value    | latitude | longitude | altitude
			-------------------------|----------|----------|-----------|---------
			${JSON.stringify(array)} | ${array} | ${2}     | ${1}      | ${3}
			${JSON.stringify(bson)}  | ${bson}  | ${2}     | ${1}      | ${3}
			${JSON.stringify(json)}  | ${json}  | ${2}     | ${1}      | ${3}
		`('from $note', ({ value, latitude, longitude, altitude }, next) => {
			const point = GeometryPoint.from(value);
			const json = point.toJSON();
			const bson = point.toBSON();

			expect(point).to.be.instanceOf(GeometryPoint);
			expect(point.coordinates).to.equal([longitude, latitude, altitude]);
			expect(point.longitude).to.equal(longitude);
			expect(point.latitude).to.equal(latitude);
			expect(point.altitude).to.equal(altitude);

			expect(json.type).to.equal('Point');
			expect(json.longitude).to.equal(longitude);
			expect(json.latitude).to.equal(latitude);
			expect(json.altitude).to.equal(altitude);
			expect(json.coordinates).to.be.undefined();

			expect(bson.type).to.equal('Point');
			expect(bson.longitude).to.be.undefined();
			expect(bson.latitude).to.be.undefined();
			expect(bson.altitude).to.be.undefined();
			expect(bson.coordinates).to.equal([1, 2, 3]);

			next();
		});

		each`
			note                          | value                                   
			------------------------------|-----------------------------------------
			NULL                          | ${null}                                 
			Boolean false                 | ${false}                                
			Boolean true                  | ${true}                                 
			Empty object                  | ${{}}                                   
			Object type: Point            | ${{ type: 'Point' }}                    
			Object type: NoPoint          | ${{ type: 'NoPoint' }}                  
			coordinates NULL              | ${{ type: 'Point', coordinates: null }} 
			coordinates [] (empty)        | ${{ type: 'Point', coordinates: [] }}   
			coordinates [1] (less than 2) | ${{ type: 'Point', coordinates: [1] }}  
		`('not from $note', ({ value }, next) => {
			expect(() => GeometryPoint.from(value)).to.throw(
				/^GeometryPoint, cannot create from/
			);

			next();
		});
	});
});
