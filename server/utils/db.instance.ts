import { Sequelize } from "sequelize";

const config = useRuntimeConfig();

const configDB = {
  port: config.PORT_SERVER_DB ? config.PORT_SERVER_DB : "",
  name: config.NAME_DB,
  user: config.USER_DB,
  pass: config.PASS_DB,
};

export const sequelize = new Sequelize(configDB.name, configDB.user, configDB.pass, {
  host: "localhost",
  dialect: "mysql",
  port: configDB.port
});