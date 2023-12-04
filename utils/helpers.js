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

export function getCookie(name) {
	// Split the cookies string into an array
	const cookies = document.cookie.split(';');

	// Loop through each cookie
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();

		// Check if the cookie starts with the desired name
		if (cookie.startsWith(`${name}=`)) {
			// Return the value of the cookie
			return cookie.substring(name.length + 1);
		}
	}

	// Return null if the cookie is not found
	return null;
}

export function generateRandomNumber(maximum) {
	// Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
	// We multiply it by the maximum value and use Math.floor() to round down
	return Math.floor(Math.random() * (maximum + 1));
}
