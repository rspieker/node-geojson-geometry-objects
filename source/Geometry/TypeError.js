function getTypeName(type) {
	const typed = Array.isArray(type)
		? 'array'
		: type === null
		? 'null'
		: typeof type;
	const name = /^(?:function|object)/.test(typed)
		? type.name || JSON.stringify(type)
		: typed;

	return name;
}

class GeometryTypeError extends Error {
	constructor(message, types) {
		const names = types
			.map(getTypeName)
			.filter((name, index, all) => all.indexOf(name) === index);

		super(`${message}: ${names}`);

		this.name = this.constructor.name;
		this.data = { types };

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = GeometryTypeError;
