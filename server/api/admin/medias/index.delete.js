import { MediasModel } from '../../../models/Medias.model';
import fs from 'fs';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	const { idMedia } = await readBody(event);
	let medias;
	let media;

	async function getMedias() {
		medias = await MediasModel.findAll({
			raw: true,
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});
	}

	try {
		media = await MediasModel.findOne({
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

			await getMedias();

			return {
				statusCode: 200,
				message: 'Mídia excluída com sucesso',
				data: { medias, isDelete: false },
			};
		}
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: `Ocorreu um erro ao excluir midia`,
			data: {
				isDelete: false,
			},
		});
	}

	if (!Boolean(media)) {
		await getMedias();
		throw createError({
			statusCode: 404,
			message: `Essa mídia não existe ou já foi excluída`,
			data: { medias, isDelete: true },
		});
	}
});
