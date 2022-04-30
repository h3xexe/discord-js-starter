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
		const notRuledInput = {};
		for (let i = 0; i < options.length; i++) {
			if (!options[i].rule) {
				notRuledInput[options[i].name] = args?.[i];
				continue;
			}
			this.inputs[options[i].name] = args?.[i];
			this.rules[options[i].name] = options[i].rule;
		}
		const validation = new Validator(this.inputs, this.rules);
		if (validation.fails()) {
			throw this.validationException(validation.errors['errors'][Object.keys(validation.errors['errors'])[0]][0]);
		}
		return Object.assign(this.inputs, notRuledInput);
	},
};
