const Validator = require('validatorjs');

module.exports = {
	inputs : {},
	rules : {},
	validationException(message) {
		return {
			name: 'ValidationFailed',
			message: message,
		};
	},
	validate(options, args) {
		for (let i = 0; i < options.length; i++) {
			this.inputs[options[i].name] = args?.[i];
			this.rules[options[i].name] = options[i].rule;
		}
		const validation = new Validator(this.inputs, this.rules);
		if (validation.fails()) {
			throw this.validationException(validation.errors['errors'][Object.keys(validation.errors['errors'])[0]][0]);
		}
		return this.inputs;
	},
};
