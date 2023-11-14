import { useStoreApp } from '~/stores/app';

export default defineNuxtPlugin((nuxt) => {
	const storeApp = useStoreApp(nuxt.$pinia);

	addRouteMiddleware('has-hotsite', async (to, from) => {
		if (storeApp.contentApp.config_will_have_hotsite)
			return navigateTo({ path: '/hotsite' });

		return navigateTo({ path: '/app/hub' });
	});
});
