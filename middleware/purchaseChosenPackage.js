import { useStoreCheckout } from '~/stores/checkout';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const cookieAuth = useCookie('tokenClient');
	const app = useNuxtApp();
	const storeCheckout = useStoreCheckout(app.$pinia);

	if (cookieAuth.value) {		
		if (!storeCheckout.packageChosen.id) {
			storeCheckout.chosenPackage(to.query.idPkg);
			storeCheckout.packageOB(to.query.idOB);
		}

		if (!to.query.idPkg) {
			return navigateTo('/checkout/pacotes');
		}
	}

	return;
});
