const GeometryCollection = require('../../source/Geometry/Collection');
const GeometryPoint = require('../../source/Geometry/Point');
const GeometryMultiPoint = require('../../source/Geometry/MultiPoint');
const GeometryLineString = require('../../source/Geometry/LineString');
const GeometryMultiLineString = require('../../source/Geometry/MultiLineString');
const GeometryPolygon = require('../../source/Geometry/Polygon');
const GeometryMultiPolygon = require('../../source/Geometry/MultiPolygon');

module.exports = {
	Point: {
		class: GeometryPoint,
		array: [0, 1],
		json: { type: 'Point', latitude: 1, longitude: 0 },
		bson: { type: 'Point', coordinates: [0, 1] }
	},
	//  A MultiPoint array notation is identical to the LineString
	//  array notation, this means the mapping cannot differentiate
	//  between the two and will prefer the LineString over MultiPoint
	MultiPoint: {
		class: GeometryMultiPoint,
		array: [[0, 1], [2, 1], [3, 1]],
		json: {
			type: 'MultiPoint',
			coordinates: [
				{ type: 'Point', latitude: 1, longitude: 0 },
				{ type: 'Point', latitude: 1, longitude: 2 },
				{ type: 'Point', latitude: 1, longitude: 3 }
			]
		},
		bson: {
			type: 'MultiPoint',
			coordinates: [[0, 1], [2, 1], [3, 1]]
		}
	},
	LineString: {
		class: GeometryLineString,
		array: [[0, 1], [2, 1], [3, 1]],
		json: {
			type: 'LineString',
			coordinates: [
				{ type: 'Point', latitude: 1, longitude: 0 },
				{ type: 'Point', latitude: 1, longitude: 2 },
				{ type: 'Point', latitude: 1, longitude: 3 }
			]
		},
		bson: {
			type: 'LineString',
			coordinates: [[0, 1], [2, 1], [3, 1]]
		}
	},
	MultiLineString: {
		class: GeometryMultiLineString,
		array: [[[0, 1], [2, 1], [3, 1]], [[1, 2], [3, 2], [4, 2]]],
		json: {
			type: 'MultiLineString',
			coordinates: [
				{
					type: 'LineString',
					coordinates: [
						{ type: 'Point', latitude: 1, longitude: 0 },
						{ type: 'Point', latitude: 1, longitude: 2 },
						{ type: 'Point', latitude: 1, longitude: 3 }
					]
				},
				{
					type: 'LineString',
					coordinates: [
						{ type: 'Point', latitude: 2, longitude: 1 },
						{ type: 'Point', latitude: 2, longitude: 3 },
						{ type: 'Point', latitude: 2, longitude: 4 }
					]
				}
			]
		},
		bson: {
			type: 'MultiLineString',
			coordinates: [[[0, 1], [2, 1], [3, 1]], [[1, 2], [3, 2], [4, 2]]]
		}
	}
};
