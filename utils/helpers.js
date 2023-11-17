export const booleanToString = (value) => {
	if (value === true) {
		return 'on';
	} else if (value === false) {
		return 'null';
	}

	return value;
};

export function doesCookieExist(name) {
	// Get all cookies in a string
	const cookies = document.cookie;

	// Split the cookie string into key-value pairs
	const pairs = cookies.split(';');

	// Iterate over the pairs to check if the desired cookie exists
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i].trim(); // Remove leading and trailing whitespaces

		// Check if the cookie name is present at the beginning of the pair
		if (pair.indexOf(name + '=') === 0) {
			return true; // The cookie exists
		}
	}

	return false; // The cookie was not found
}
