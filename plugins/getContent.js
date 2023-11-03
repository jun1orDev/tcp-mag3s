import { useStoreApp } from '~/stores/app';

export default defineNuxtPlugin((nuxt) => {
	const store = useStoreApp(nuxt.$pinia);

	addRouteMiddleware(
		'get-content-app',
		async (to, from) => {
			if (store.contentHasBeenLoaded) return;

			await store.getContentApp(useToast);
		},
		{ global: true }
	);
});
