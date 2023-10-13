import { DataTypes, Model, UUIDV4 } from 'sequelize';

export class TagsMediaModel extends Model {}

TagsMediaModel.init(
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
	},
	{ sequelize, tableName: 'tagsmedias' }
);
