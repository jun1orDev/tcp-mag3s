const config = useRuntimeConfig();

export default defineNitroPlugin(async (nitro) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      alter: config.forceAlterDb,
      force: config.forceDropDb,
    });
    await createAdmin();
    console.log("conectado ao banco!");
  } catch (err) {
    console.log(`Não foi possível conectar ao banco: ${err}`);
  }
});
