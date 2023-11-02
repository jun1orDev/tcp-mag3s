export const booleanToString = (value) => {
	if (value === true) {
		return 'on';
	} else if (value === false) {
		return 'null';
	}

	return value;
};
