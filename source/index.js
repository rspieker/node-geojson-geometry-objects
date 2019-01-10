const Position = require('./Geometry/Position.js');
const Point = require('./Geometry/Point.js');
const MultiPoint = require('./Geometry/MultiPoint.js');
const LineString = require('./Geometry/LineString.js');
const MultiLineString = require('./Geometry/MultiLineString.js');
const Polygon = require('./Geometry/Polygon.js');
const MultiPolygon = require('./Geometry/MultiPolygon.js');
const GeometryCollection = require('./Geometry/Collection.js');
const LinearRing = require('./Geometry/LinearRing.js');
const Mapper = require('./Mapper.js');

module.exports = {
	//  base position
	Position,

	//  GeoJSON types
	Point,
	MultiPoint,
	LineString,
	MultiLineString,
	Polygon,
	MultiPolygon,
	GeometryCollection,

	//  helpers
	Helper: {
		LinearRing,
		Mapper
	}
};
