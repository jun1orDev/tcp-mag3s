
import { useStoreCheckout } from '~/stores/checkout';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const cookieAuth = useCookie('tokenClient');
	const app = useNuxtApp();
	const storeCheckout = useStoreCheckout(app.$pinia);

	if (cookieAuth.value) {
		await storeCheckout.storePackages(useToast);
		return;
	}

return;
});
