import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeIncentive = useStoreIncentive(app.$pinia);

	storeIncentive.userAcountData.loading = false;
	await storeIncentive.userAccount(useToast);

  if (
    !storeIncentive.userAcountData.name ||
    !storeIncentive.userAcountData.phone.number ||
    !storeIncentive.userAcountData.cpf
  ) {
    return navigateTo({
      path: '/checkout/cadastro2',
      query: {
        idPkg: to.query.idPkg,
        idOB: to.query.idOB,
      },
    });
  }

	return;
});
