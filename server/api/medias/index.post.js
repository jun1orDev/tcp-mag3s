import multer from 'multer';
import { MediasModel } from './../../models/Medias.model';

export default defineEventHandler(async (event) => {
	const formData = await readFormData(event);
	const name = formData.get('name');
	const value = formData.get('value');
	const tag = formData.get('tag');
	const type = formData.get('type');

	// Verify empty inputs
	if (!name) {
		return {
			message: 'Nome da mídia é obrigatório',
		};
	}
	if (!value) {
		return {
			message: 'Conteúdo da mídia é obrigatório',
		};
	}
	if (!tag) {
		return {
			message: 'Tag da mídia é obrigatório',
		};
	}
	if (!type) {
		return {
			message: 'Tipo da media é obrigatório',
		};
	}

	// check media existis
	const hasMedia = await MediasModel.findOne({ where: { name } });
	if (hasMedia) {
		return {
			message: 'este nome já existe, escolha outro!',
		};
	}

	try {
		let filePaths = [];
		let fileNames = [];
		const storage = multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, 'public/uploads');
			},
			filename: (req, file, cbd) => {
				const filePath = `${Date.now()}-${file.originalname
					.toLocaleLowerCase()
					.replace(/\s+/g, '-')
					.replace(/\./g, '-')}`;
				filePaths.push(filePath);
				fileNames.push(file.originalname);
				cbd(null, filePath);
			},
		});

		const upload = multer({
			storage: storage,
			fileFilter: (req, file, cb) => {
				cb(null, true);
			},
		});

		await callNodeListener(
			// @ts-expect-error: Nuxt 3
			upload.array('value', 10),
			event.node.req,
			event.node.res
		);
	} catch (error) {
		console.log(error);
		return createError({
			statusCode: 500,
			statusMessage: 'Algo deu errado',
		});
	}

	// Create new media
	const media = await MediasModel.create({
		name,
		value,
		tag,
		type,
	});

	return {
		message: 'media cadastrada com sucesso!',
	};
});
