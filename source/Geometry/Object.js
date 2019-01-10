class GeometryObject {
	get type() {
		const { constructor } = this;
		const { type } = constructor;

		return type;
	}

	static get type() {
		return 'Object';
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
