
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const cookieAuth = useCookie('tokenClient');
	const app = useNuxtApp();
	const storeIncentive = useStoreIncentive(app.$pinia);

	if (!cookieAuth.value) {
		const data = await storeIncentive.clientLogin();
		let cookie = useCookie('tokenClient', { maxAge: data.expires_in });
		cookie.value = data.access_token;
		return;
	}
});
