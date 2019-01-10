/**
 * Basic Geometry object
 *
 * @class GeometryObject
 */
class GeometryObject {
	/**
	 * Obtain the instance type
	 *
	 * @readonly
	 * @memberof GeometryObject
	 */
	get type() {
		const { constructor } = this;
		const { type } = constructor;

		return type;
	}

	/**
	 * Obtain the type
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryObject
	 */
	static get type() {
		return 'Object';
	}

	/**
	 * Obtain the mappers used to validate and/or constructs
	 * (used by the static .from method)
	 *
	 * @readonly
	 * @static
	 * @memberof GeometryObject
	 */
	static get mapping() {
		return [];
	}

	/**
	 * Validate the provided values (obtained from .mapping) and determine
	 * wether or not the value matches the Geometry object conditions
	 *
	 * @static
	 * @param    {*} value
	 * @returns  boolean
	 * @memberof GeometryObject
	 */
	static valid(value) {
		const valid =
			this.mapping.filter((map) => map.validate(value)).length > 0;

		return valid;
	}

	/**
	 * Determine whether the provided value is valid for the Geometry object
	 * and create a new instance based on it
	 *
	 * @static
	 * @param    {*} value
	 * @returns  GeometryObject
	 * @throws   Error
	 * @memberof GeometryObject
	 */
	static from(value) {
		const factory = this.mapping
			.filter((map) => map.validate(value))
			.map((map) => map.factory)
			.shift();

		if (factory) {
			return factory(value);
		}

		throw new Error(
			`${this.name}, cannot create from: ${JSON.stringify(value)}`
		);
	}
}

module.exports = GeometryObject;
