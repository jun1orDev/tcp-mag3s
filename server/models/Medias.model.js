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
			set(payload) {
				this.setDataValue('name', payload.replace(/[ ]+/g, '_'));
			},
		},
		value: {
			type: DataTypes.TEXT,
			required: true,
			get() {
				const rawValue = this.getDataValue('value');
				return switchTextToBoolean(rawValue.split(';'));
			},
			set(payload) {
				if (typeof payload !== 'string') {
					this.setDataValue('value', payload.join(';'));
				} else {
					this.setDataValue('value', payload);
				}
			},
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
