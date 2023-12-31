import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtPlugin((nuxt) => {
	const store = useStoreApp(nuxt.$pinia);
	const storeIncentive = useStoreIncentive(nuxt.$pinia);

	addRouteMiddleware(
		'get-content-app',
		async (to, from) => {
			// Validação de usuário logado
			if (useCookie('tokenUser').value) storeIncentive.userLoggedIn = true;
			else storeIncentive.userLoggedIn = false;

			// Caso já exista conteúdo do admin carregado na aplicação, não chamar novamente
			if (store.contentHasBeenLoaded) return;

			await store.getContentApp(useToast);
		},
		{ global: true }
	);
});
