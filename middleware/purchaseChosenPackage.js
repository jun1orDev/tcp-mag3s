import { useStoreCheckout } from '~/stores/checkout';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const cookieAuth = useCookie('tokenClient');
	const app = useNuxtApp();
	const storeCheckout = useStoreCheckout(app.$pinia);

	if (cookieAuth.value) {
		if (!storeCheckout.packageChosen) {
			storeCheckout.chosenPackage(to.query.idPkg);
		}

		if (!to.query.idPkg) {
			return navigateTo('/checkout/pacotes');
		}
	}

	return;
});
