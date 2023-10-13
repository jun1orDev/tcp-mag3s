import { MediasModel } from './../../models/Medias.model';

export default defineEventHandler(async (event) => {
	// check media existis
	const medias = await MediasModel.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}});

	if (medias.length) {
		return {
			data: medias,
			message: 'Mídias obtidas com sucesso!',
		};
	} else {
		return {
			message: 'Não existem mídias cadastradas!',
		};
	}
});
