const storage = new WeakMap();

class GeometryObject {
	constructor(values) {
		storage.set(this, values);
	}

	get type() {
		const { constructor } = this;
		const { type } = constructor;

		return type;
	}

	get coordinates() {
		const { coordinates } = storage.get(this);

		return coordinates;
	}

	static get type() {
		return 'Object';
	}

	toBSON() {
		const { type, coordinates: items } = this;
		const coordinates = items.map((item) => item.toBSON().coordinates);

		return { type, coordinates };
	}

	toJSON() {
		const { type, coordinates: items } = this;
		const coordinates = items.map((item) => item.toJSON());

		return { type, coordinates };
	}

	static get mapping() {
		return [];
	}

	static valid(value) {
		const valid =
			this.mapping.filter((map) => map.validate(value)).length > 0;

		return valid;
	}

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
