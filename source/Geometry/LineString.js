const GeometryMultiPoint = require('./MultiPoint.js');

class GeometryLineString extends GeometryMultiPoint {
	static get type() {
		return 'LineString';
	}
}

module.exports = GeometryLineString;
