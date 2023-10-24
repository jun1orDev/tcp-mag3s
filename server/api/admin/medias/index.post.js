import { MediasModel } from '../../../models/Medias.model';
import { readFiles } from 'h3-formidable';
import { firstValues } from 'h3-formidable/helpers';
import { TagsMediaModel } from '~/server/models/TagsMedia.model';
import fs from 'fs';
import path from 'path';

const config = useRuntimeConfig();

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
	let tag = fieldsSingle.tag;
	const createNewTag = Boolean(+fieldsSingle.newtag);
	const type = fieldsSingle.type;

	// ⬇️ Verify empty inputs ⬇️

	// Name
	if (!name) {
		throw createError({
			statusCode: 422,
			message: 'Nome da mídia é obrigatorio',
		});
	} else {
		// check name only text
		if (!hasOnlyText.test(name))
			throw createError({
				statusCode: 422,
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
				message: 'Este nome de mídia já existe, escolha outro!',
			});
	}

	// Tag
	tag = toLetterFisrtUperCase(tag).replace(/[ ]+/g, '').trim();
	const tagData = await TagsMediaModel.findAll({ where: { name: tag } });

	if (!tag) {
		throw createError({
			statusCode: 422,
			message: 'Tag da mídia é obrigatório',
		});
	}

	if (createNewTag) {
		if (!hasOnlyText.test(tag))
			throw createError({
				statusCode: 422,
				message:
					'Nome de tag não pode conter números, caracteres especiais e espaços no final do nome!',
			});

		if (tagData.length) {
			throw createError({
				statusCode: 422,
				message: 'Esse nome de Tag já existe, tente outro',
			});
		}
	}

	// Type
	if (!type) {
		throw createError({
			statusCode: 422,
			message: 'Tipo da media é obrigatório',
		});
	} else {
		if (value && type === config.typesMedia[6]) {
			value = switchInputTextBoolean(value);
		}
	}

	// Value
	if (!value) {
		throw createError({
			statusCode: 422,
			message: 'Conteúdo da mídia é obrigatório',
		});
	}

	// Verify type Midia correct
	if (validArchive) {
		throw createError({
			statusCode: 415,
			message: 'Mídias não suportadas! Envie apenas imagens ou pdf',
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

	// Create new tag
	if (createNewTag) await TagsMediaModel.create({ name: tag });

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
