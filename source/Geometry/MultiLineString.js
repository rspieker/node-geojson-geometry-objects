const GeometryObject = require('./Object.js');
const GeometryLineString = require('./LineString.js');

class GeometryMultiLineString extends GeometryObject {
	constructor(...lines) {
		super({
			coordinates: lines.map((line) => GeometryLineString.from(line))
		});
	}

	static get type() {
		return 'MultiLineString';
	}

	static get mapping() {
		return super.mapping.concat([
			{
				validate: (value) =>
					value &&
					typeof value === 'object' &&
					value.type === this.type &&
					Array.isArray(value.coordinates) &&
					value.coordinates.length > 0 &&
					value.coordinates.filter((val) =>
						GeometryLineString.valid(val)
					).length === value.coordinates.length,
				factory: (value) => new this(...value.coordinates)
			},
			{
				validate: (value) =>
					value &&
					Array.isArray(value) &&
					value.length > 0 &&
					value.filter((val) => GeometryLineString.valid(val))
						.length === value.length,
				factory: (value) => new this(...value)
			}
		]);
	}
}

module.exports = GeometryMultiLineString;
