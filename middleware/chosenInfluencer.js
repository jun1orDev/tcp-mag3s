import { useStoreApp } from '~/stores/app';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);

	storeApp.chosenInfluencer(to.params.influencer);
	return;
});
