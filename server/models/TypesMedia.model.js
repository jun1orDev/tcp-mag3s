import { DataTypes, Model, UUIDV4 } from 'sequelize';

export class TypesMediaModel extends Model {}

TypesMediaModel.init(
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
	{ sequelize, tableName: 'typemedias' }
);
