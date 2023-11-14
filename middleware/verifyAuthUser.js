import { useStoreIncentive } from "~/stores/incentive";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeIncentive = useStoreIncentive(app.$pinia);
	const cookieAuth = useCookie('tokenUser');

	if (!cookieAuth.value) {
		return navigateTo({ path: '/login' });
	}

	return await storeIncentive.clientLogin();
});
