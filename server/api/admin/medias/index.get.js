import { MediasModel } from '../../../models/Medias.model';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	// check media existis
	const medias = await MediasModel.findAll({
		attributes: { exclude: ['createdAt', 'updatedAt'] },
	});

	if (medias.length) {
		return {
			statusCode: 200,
			message: 'Mídias obtidas com sucesso!',
			data: medias,
		};
	} else {
		throw createError({
			statusCode: 406,
			message: 'Não existem mídias cadastradas!',
		});
	}
});
