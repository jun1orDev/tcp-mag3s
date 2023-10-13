import { MediasModel } from './../../models/Medias.model';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	console.log(event.node.req);

	// Verify empty inputs
	if (!body.name) {
		return {
			message: 'Nome da mídia é obrigatório',
		};
	}
	if (!body.value) {
		return {
			message: 'Conteúdo da mídia é obrigatório',
		};
	}
	if (!body.tag) {
		return {
			message: 'Tag da mídia é obrigatório',
		};
	}
	if (!body.type) {
		return {
			message: 'Tipo da media é obrigatório',
		};
	}


	// check media existis
	const hasMedia = await MediasModel.findOne({ where: { name: body.name } });
	if (hasMedia) {
		return {
			message: 'este nome já existe, escolha outro!',
		};
	}

	// Create new media
	const media = await MediasModel.create({
		name: body.name,
		value: body.value,
		tag: body.tag,
		type: body.type,
	});

	return {
		message: 'media cadastrada com sucesso!',
	};
});
