import { DataTypes, Model, UUIDV4 } from "sequelize";

export class RoleUserModel extends Model {}

RoleUserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      require: true,
    },
  },
  { sequelize, tableName: "roleusers" }
);

