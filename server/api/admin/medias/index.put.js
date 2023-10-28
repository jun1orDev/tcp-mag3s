import { MediasModel } from '../../../models/Medias.model';
import { readFiles } from 'h3-formidable';
import { firstValues } from 'h3-formidable/helpers';
import fs from 'fs';
import path from 'path';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	// verify user loggin
	userIsLoggedIn(event);

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
	const id = fieldsSingle.id;
	let value = files.value || fieldsSingle.value;
	let value_list_delete = fieldsSingle.value_list_delete;
	let valueDBNotRemoveArchive;
	const tag = fieldsSingle.tag;
	const type = fieldsSingle.type;

	// Verify empty inputs
	const getMedia = await MediasModel.findOne({ raw: true, where: { id } });
	if (!Boolean(getMedia)) {
		throw createError({
			statusCode: 422,
			message: 'Essa mídia não existe',
		});
	}

	if (!name) {
		throw createError({
			statusCode: 422,
			message: 'Nome da mídia é obrigatorio',
		});
	} else {
		// check name only text
		const hasOnlyText = /^[A-Za-z]+( [A-Za-z]+)*$/;
		if (!hasOnlyText.test(name))
			throw createError({
				statusCode: 422,
				message:
					'Nome de mídia não pode conter números, caracteres especiais e espaços no final do nome!',
			});

		// check media existis
		const hasMedia = await MediasModel.findOne({
			raw: true,
			where: { name: name.replace(/[ ]+/g, '_') },
		});

		if (Boolean(hasMedia))
			if (hasMedia.id !== id) {
				throw createError({
					statusCode: 422,
					message: 'Este nome de mídia já existe, escolha outro!',
				});
			}
	}

	if (!tag) {
		throw createError({
			statusCode: 422,
			message: 'Tag da mídia é obrigatório',
		});
	}

	if (!type) {
		throw createError({
			statusCode: 422,
			message: 'Tipo da media é obrigatório',
		});
	} else {
		// change type media to archive
		if (type !== getMedia.type && type === config.typesMedia[3]) {
			await MediasModel.update(
				{
					value: '',
				},
				{ where: { id } }
			);
		}

		// change type media to boolean
		if (value && type === config.typesMedia[6]) {
			value = switchInputTextBoolean(value);
		}
	}

	// Verify type Midia correct
	if (validArchive) {
		throw createError({
			statusCode: 415,
			message: 'Mídias não suportadas! Envie apenas imagens ou pdf',
		});
	}

	if (!value && !getMedia.value) {
		throw createError({
			statusCode: 422,
			message: 'Conteúdo da mídia é obrigatório',
		});
	}

	// remove medias selected
	if (value_list_delete) {
		if (!value) {
			throw createError({
				statusCode: 422,
				message:
					'Conteúdo da mídia é obrigatório quando excluir mídias existentes!',
			});
		}
		valueDBNotRemoveArchive = getMedia.value
			.split(';')
			.filter(
				(archiveDelete) => !value_list_delete.split(';').includes(archiveDelete)
			);
		value_list_delete.split(';').forEach((mediaFile) => {
			const hasMediaExists = fs.existsSync(`public/uploads/${mediaFile}`);

			if (hasMediaExists) fs.unlinkSync(`public/uploads/${mediaFile}`);
		});

		await MediasModel.update(
			{
				value: valueDBNotRemoveArchive,
			},
			{ where: { id } }
		);
	}

	// Save media archive
	if (files.value) {
		let valueDB = await MediasModel.findOne({
			raw: true,
			where: { id },
		});
		let listFiles = valueDB.value.split(';').filter(Boolean);

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

	// update media
	await MediasModel.update(
		{
			name,
			value: value || getMedia.value,
			tag,
			type,
		},
		{ where: { id } }
	);

	const media = await MediasModel.findOne({
		raw: true,
		where: { id },
		attributes: { exclude: ['createdAt', 'updatedAt'] },
	});

	return {
		statusCode: 200,
		message: 'Mídia atualizada com sucesso!',
		data: {
			id: media.id,
			name: media.name,
			value: media.value,
			tag: media.tag,
			type: media.type,
		},
	};
});
