import { MediasModel } from '../../../models/Medias.model';
import { readFiles } from 'h3-formidable';
import { firstValues } from 'h3-formidable/helpers';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

	// create media directory if it doesn't exist
	if (!fs.existsSync('public/uploads')) {
		fs.mkdirSync(path.join('public', 'uploads'));
	}

	let validArchive = false;
	const { fields, form, files } = await readFiles(event, {
		includeFields: true,
		multiples: true,
		maxFiles: 10,
		maxFilesSize: 5 * 1024 * 1024,
		maxFields: 8,
		filter: function ({ name, originalFilename, mimetype }) {
			// keep only images and pdf's
			let valid =
				mimetype && (mimetype.includes('image') || mimetype.includes('pdf'));

			if (!valid) {
				validArchive = true;
			}

			return valid;
		},
	});

	// Gets first values of fields
	const exceptions = ['thisshouldbeanarray'];
	const fieldsSingle = firstValues(form, fields, exceptions);

	const name = fieldsSingle.name;
	let value = files.value || fieldsSingle.value;
	const tag = fieldsSingle.tag;
	const type = fieldsSingle.type;

	// Verify empty inputs
	if (!name) {
		throw createError({
			statusCode: 422,
			statusMessage: 'Nome da mídia é obrigatorio',
		});
	} else {
		// check name only text
		const hasOnlyText = /^[A-Za-z]+( [A-Za-z]+)*$/;
		if (!hasOnlyText.test(name))
			throw createError({
				statusCode: 422,
				statusMessage: 'Erro nos arquivos enviados',
				message:
					'Nome de mídia não pode conter números, caracteres especiais e espaços no final do nome!',
			});

		// check media existis
		const hasMedia = await MediasModel.findOne({
			where: { name: name.replace(/[ ]+/g, '_') },
		});
		if (hasMedia)
			throw createError({
				statusCode: 422,
				statusMessage: 'Este nome de mídia ja existe!',
				message: 'Este nome de mídia já existe, escolha outro!',
			});
	}

	if (!tag) {
		throw createError({
			statusCode: 422,
			statusMessage: 'Tag da mídia é obrigatório',
		});
	}

	if (!type) {
		throw createError({
			statusCode: 422,
			statusMessage: 'Tipo da media é obrigatório',
		});
	}

	// Verify type Midia correct
	if (validArchive) {
		throw createError({
			statusCode: 415,
			statusMessage: 'Midias nao suportadas!',
			message: 'Mídias não suportadas! Envie apenas imagens ou pdf',
		});
	}

	if (!value) {
		throw createError({
			statusCode: 422,
			statusMessage: 'Conteúdo da mídia é obrigatório',
		});
	}

	// Save media archive
	let listFiles = [];
	if (files.value) {
		for (const file of files.value) {
			const fileName = `${Date.now()}-${file.newFilename}-${
				file.mimetype.split('/')[1]
			}`;
			const newPath = `${path.join('public', 'uploads', fileName)}`;
			fs.copyFileSync(file.filepath, newPath);
			listFiles.push(fileName);
		}
		value = listFiles;
	}

	// Create new media
	const media = await MediasModel.create({
		name,
		value,
		tag,
		type,
	});

	return {
		statusCode: 200,
		message: 'Mídia cadastrada com sucesso!',
		data: {
			id: media.id,
			name: media.name,
			value: media.value,
			tag: media.tag,
			type: media.type,
		},
	};
});
