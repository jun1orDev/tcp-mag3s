import { MediasModel } from '../../../models/Medias.model';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const { idMedia } = await readBody(event);
	let medias;

	try {
		const media = await MediasModel.findOne({ where: { id: idMedia } });

		if (Boolean(media)) {
			media.value.forEach((mediaFile) => {
				if (media.type === 'archive') {
					fs.unlinkSync(`public/uploads/${mediaFile}`);
				}
			});

			await media.destroy();

			medias = await MediasModel.findAll();

			return {
				statusCode: 200,
				message: 'Mídia excluída com sucesso',
				data: medias,
			};
		}

		return {
			statusCode: 200,
			message: 'Essa mídia não existe ou já foi excluída',
		};
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: `Ocorreu um erro ao excluir midia`,
		});
	}
});
