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
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});
	}

	try {
		media = await MediasModel.findOne({
			where: { id: idMedia },
		});

		if (Boolean(media)) {
			if (media.value) {
				const typeMediaArchive = media.type === config.typesMedia[3];
				const typeMediaJson = media.type === config.typesMedia[7];

				if (!typeMediaArchive && !typeMediaJson) return;

				let medias;

				if (typeMediaArchive) medias = media.value;
				if (typeMediaJson) {
					medias = [];
					media.value.list.forEach((item) => {
						if (item.type === 'archive') {
							medias.push(item.one);
						}
					});
				}

				if (medias) {
					medias.forEach(async (mediaFile) => {
						console.log(mediaFile);

						return;

						const bucket = googleCloudStorage.bucket(config.gcsBucketname);
						const fileUp = bucket.file(
							`${config.gcsSubfolder}${config.gcsSubfolderEnvironment}${mediaFile}`
						);

						try {
							await fileUp.delete();
							console.log('Arquivo excluído com sucesso');
						} catch (error) {
							console.error(`Erro ao excluir a imagem: ${error}`);
						}
					});
				}
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
