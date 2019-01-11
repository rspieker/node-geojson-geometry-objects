# GeoJSON Geometry Objects

The [GeoJSON format](https://tools.ietf.org/html/rfc7946), as the name suggests, is a format in which geospatial information can be uniformly represented using JavaScript Object Notation (JSON).

Among other implementations, the format is used by [MongoDB geospatial queries](https://docs.mongodb.com/manual/geospatial-queries/), which is what lead to this module, as while the format is easy to comprehend, it also carries something that kept feeling a bit off; the latitude/longitude ordering.
The common reference to anything using latitude/longitude seems to prefer latitude over longitude, where GeoJSON uses longitude then latitude. Simple to understand, simple to mess up.

This module was created to easily change between the GeoJSON format and a JSON format which expresses the latitude/longitude as named keys to an object, removing the need for order interpretation.

# Installation

The GeoJSON Geometry Objects module is a scoped package, which means the scope has to be used during both installation and use of the module.

```
$ npm install --save geojson-geometry-objects
```

# Usage

Like the installation, the scope also must be specified when using the module

```js
const GeoJSON = require('geojson-geometry-object');
const point = GeoJSON.Point.from([5.9117305, 51.9748942]);
const same = GeoJSON.Point.from({
	latitude: 51.9748942,
	longitude: 5.9117305
});
```

# API

The module offers ES6 classes which are based on the [GeoJSON specification](https://tools.ietf.org/html/rfc7946#section-3.1).

All GeoJSON types inherit from the Position object, which implements the `coordinates` property available in all types.

## Common interface

| property      | type   | description                                                                     |
| ------------- | ------ | ------------------------------------------------------------------------------- |
| `type`        | string | The instance type (usable both statically and as instance property)             |
| `coordinates` | Array  | The GeoJSON coordinates                                                         |
| `rules`       | Array  | An array containing the validation and factory rules used by `from` and `valid` |

| method   | arguments   | returns   | description                                                                                                                      |
| -------- | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `valid`  | coordinates | `boolean` | Are the provided coordinates usable to create an instance                                                                        |
| `from`   | coordinates | instance  | Validate the provided coordinates and construct a new instance if so, throws an Error if the coordinates did not pass validation |
| `toBSON` |             | `object`  | The instance represented as BSON (the JSON-like format MongoDB uses), this format adheres to the GeoJSON format                  |
| `toJSON` |             | `object`  | The instance represented as JSON using the keyed object notation                                                                 |

## Point

The [GeoJSON Point](https://tools.ietf.org/html/rfc7946#section-3.1.2) implementation, where the coordinates represent a single position with at least latitude and longitude, optionally also an altitude

| property      | type   | value                                                             |
| ------------- | ------ | ----------------------------------------------------------------- |
| `type`        | string | `'Point'`                                                         |
| `latitude`    | number | The latitude provided during creation                             |
| `longitude`   | number | The longitude provided during creation                            |
| `altitude`    | number | The altitude provided during creation (undefined if not provided) |
| `coordinates` | array  | The longitude, latitude and optionally altitude of the Point      |

## MultiPoint

The [GeoJSON MultiPoint](https://tools.ietf.org/html/rfc7946#section-3.1.3) implementation, where the coordinates represent an array of positions.

| property      | type   | value                      |
| ------------- | ------ | -------------------------- |
| `type`        | string | `'MultiPoint'`             |
| `coordinates` | array  | Array of `Point` instances |

## LineString

The [GeoJSON LineString](https://tools.ietf.org/html/rfc7946#section-3.1.4) implementation, where the coordinates represent a line consisting of two or more positions.

| property      | type   | value                      |
| ------------- | ------ | -------------------------- |
| `type`        | string | `'LineString'`             |
| `coordinates` | array  | Array of `Point` instances |

## MultiLineString

The [GeoJSON MultiLineString](https://tools.ietf.org/html/rfc7946#section-3.1.5) implementation, where the coordinates represent multiple LineStrings

| property      | type   | value                           |
| ------------- | ------ | ------------------------------- |
| `type`        | string | `'MultiLineString'`             |
| `coordinates` | array  | Array of `LineString` instances |

## Polygon

The [GeoJSON Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6) implementation, where the coordinates represent a surface expressed with a Linear Ring (a "closed" MultiLineString)

| property      | type   | value                                     |
| ------------- | ------ | ----------------------------------------- |
| `type`        | string | `'Polygon'`                               |
| `coordinates` | array  | Array with a single `LinearRing` instance |

## MultiPolygon

The [GeoJSON MultiPolygon](https://tools.ietf.org/html/rfc7946#section-3.1.7) implementation, where the coordinates represent multiple surfaces. The first surface describes the outer surface and any following surface describes a hole in the outer surface.

| property      | type   | value                           |
| ------------- | ------ | ------------------------------- |
| `type`        | string | `'MultiPolygon'`                |
| `coordinates` | array  | Array of `LinearRing` instances |

## GeometryCollection

The [GeoJSON GeometryCollection](https://tools.ietf.org/html/rfc7946#section-3.1.8) implementation, representing one or more GeoJSON types.
The representation uses the `geometries` property instead of `coordinates`, indicating the purpose of the class.

| property      | type   | value                                                                                                      |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| `type`        | string | `'GeometryCollection'`                                                                                     |
| `coordinates` | array  | Array of `Point`, `MultiPoint`, `LineString`, `MultiLineString`, `Polygon` and/or `MultiPolygon` instances |

## Helpers

Some helper classes which are not GeoJSON types but useful to have access to.

### Position

The base for all GeoJSON types is the Position class ([reference](https://tools.ietf.org/html/rfc7946#section-3.1.1)), this is also the lowest level of classes exposed by GeoJSON Geometry Objects module, it is not intended to be used directly (altough one can) but as generic means to test for inheritance (e.g. `instanceof Position`);

The `Position` class is what actually facilitates the `coordinates` property.

### Linear Ring

While not an actual GeoJSON type, a 'Linear Ring' is a closed `MultiLineString` as used by `Polygon`. The difference is that the LinearRing class actually verifies the first and last points to be identical ("closed") as rules for the `valid` and `from` methods.

### Mapper

The `Mapper` is a simple object which accepts the types you wish to map into GeoJSON objects, it verifies wether the types passed in are instances of `Position` and lets you map any of those types into the appropriate GeoJSON types (if valid - obviously)

| method      | arguments | description                                                                                             |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------- |
| `candidate` | `{*}`     | Obtain the first GeoJSON type capable of handling the provided value, if any                            |
| `valid`     | `{*}`     | Determine whether any GeoJSON type registered with the Mapper is capable of handling the provided value |
| `map`       | `{*}`     | Map the provided value into a GeoJSON type, if no type is capable of handling it, throws an Error       |

# License

MIT License Copyright (c) 2019 Rogier Spieker

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
