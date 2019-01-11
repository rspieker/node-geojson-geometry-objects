const GeometryPosition = require('./Geometry/Position.js');
const GeometryTypeError = require('./Geometry/TypeError.js');

const storage = new WeakMap();

/**
 * Map GeometryPosition extends
 *
 * @class Mapper
 */
class Mapper {
	/**
	 * Creates an instance of Mapper
	 *
	 * @param    ...{GeometryPosition}
	 * @memberof Mapper
	 */
	constructor(...types) {
		const invalid = types.filter(
			(type) => !(type && type.prototype instanceof GeometryPosition)
		);

		if (invalid.length) {
			throw new GeometryTypeError('Cannot map type', invalid);
		}

		storage.set(this, { types });
	}

	/**
	 * Find the first type able to handle the provided value
	 *
	 * @param    {*} value
	 * @returns  GeometryPosition
	 * @memberof Mapper
	 */
	candidate(value) {
		const { types } = storage.get(this);

		return types.reduce(
			(found, type) => found || (type.valid(value) ? type : found),
			null
		);
	}

	/**
	 * Does the value have any types capable of handling it
	 *
	 * @param    {*} value
	 * @returns  boolean
	 * @memberof Mapper
	 */
	valid(value) {
		return Boolean(this.candidate(value));
	}

	/**
	 * Map the provided value into a matching GeometryPosition extend
	 *
	 * @param    {*} value
	 * @returns  GeometryPosition
	 * @throws   Error
	 * @memberof Mapper
	 */
	map(value) {
		const type = this.candidate(value);

		if (type) {
			return type.from(value);
		}

		throw new Error(`Mapper cannot map ${JSON.stringify(value)}`);
	}
}

module.exports = Mapper;
