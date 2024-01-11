import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);
	const storeCheckout = useStoreCheckout(app.$pinia);

	if (!storeCheckout.formRegister.feedbackPayment) {
		return navigateTo({
			path: '/checkout/pagamento',
			query: {
				idPkg: to.query.idPkg,				
				idOB: to.query.idOB,
			},
		});
	}

	return;
});
