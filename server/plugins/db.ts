const config = useRuntimeConfig();

export default defineNitroPlugin(async (nitro) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      alter: config.FORCE_ALTER_DB,
      force: config.FORCE_DROP_DB,
    });
    await createAdmin();
    console.log("conectado ao banco!");
  } catch (err) {
    console.log(`Não foi possível conectar ao banco: ${err}`);
  }
});
