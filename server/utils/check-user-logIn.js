export const userIsLoggedIn = (event) => {
	if (!event.context.auth) {
		throw createError({
			statusCode: 401,
			message: 'Faça o login para continuar!',
			data: {
				redirect: true,
			},
		});
	}
};
