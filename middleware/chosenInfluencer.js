import { useStoreApp } from '~/stores/app';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);

	// Salvando o código do influencer em um cookie
	if (to.params.influencer) {
		const cookieInflu = useCookie('influencerCode', {
			maxAge: 86400,
			sameSite: true,
			httpOnly: false,
		});
		cookieInflu.value = to.params.influencer;
	}

	storeApp.chosenInfluencer(to.params.influencer);
	return;
});
