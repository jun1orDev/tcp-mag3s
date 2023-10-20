import { UserModel } from '../../../models/User.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const users = await UserModel.findAll();

	return {
		statusCode: 200,
		message: 'Lista de usuários obtida com sucesso',
		data: users,
	};
});
