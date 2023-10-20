import { MediasModel } from '../../../models/Medias.model';
import fs from 'fs';
import path from 'path';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const { idMedia } = await readBody(event);
	let medias;

	try {
		const media = await MediasModel.findOne({
			where: { id: idMedia },
		});

		if (Boolean(media)) {
			if (media.type === config.typesMedia[3]) {
				media.value.forEach((mediaFile) => {
					const hasMediaExists = fs.existsSync(`public/uploads/${mediaFile}`);

					if (hasMediaExists) fs.unlinkSync(`public/uploads/${mediaFile}`);
				});
			}

			await media.destroy();

			medias = await MediasModel.findAll({
				raw: true,
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});

			return {
				statusCode: 200,
				message: 'Mídia excluída com sucesso',
				data: medias.filter(
					(media) => {
						media.value = switchTextToBoolean(media.value.split(';'));
						return media;
					}
				),
			};
		}

		return {
			statusCode: 200,
			message: 'Essa mídia não existe ou já foi excluída',
		};
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: `Ocorreu um erro ao excluir midia`,
		});
	}
});
