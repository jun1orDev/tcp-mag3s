import { DataTypes, Model, UUIDV4 } from 'sequelize';

export class MediasModel extends Model {}

const config = useRuntimeConfig();

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
				const type = this.getDataValue('type');

				if (rawValue) {
					switch (type) {
						// Archive
						case config.typesMedia[3]:
							return rawValue.split(';');

						// Boolean
						case config.typesMedia[6]:
							return switchTextToBoolean(rawValue);

						// Text / Link / Color
						default:
							return rawValue;
					}
				}
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
