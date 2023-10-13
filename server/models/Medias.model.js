import { TagsMediaModel } from './TagsMedia.model';
import { DataTypes, Model, UUIDV4 } from 'sequelize';

export class MediasModel extends Model {}

MediasModel.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			required: true,
		},
		value: {
			type: DataTypes.STRING,
			required: true,
		},
		tag: {
			type: DataTypes.STRING,
			required: true,
		},
		type: {
			type: DataTypes.STRING,
			required: true,
		},
	},
	{ sequelize, tableName: 'medias' }
);
