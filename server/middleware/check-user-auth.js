import { UserModel } from '../models/User.model';

export default defineEventHandler(async (event) => {
	const idUser = getCookie(event, 'idUser');

	if (idUser) {
		const user = await UserModel.findOne({
			raw: true,
			where: { id: idUser },
		});

		if (user) {
			event.context.auth = {
				id: user.id,
				role: user.role,
			};
		}
	}
});
