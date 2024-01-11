import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);

	if (useCookie('tokenUser').value) {
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
