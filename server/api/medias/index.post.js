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
