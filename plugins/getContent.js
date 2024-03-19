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

			// Meta Pixel Code
			// nuxt.$fb.setPixelId(2620787371431783);
			// nuxt.$fb.options.pixelId = 2620787371431783;
			// nuxt.$fb.enable();
			// console.log();


			// Exibir ou não a edição de cartão de crédito no Menu Behaviour
			store.selectMenuBehaviour(5, 'showing', store.contentApp.config_will_have_credit_card_payments, false, 3);

			// Caso já exista conteúdo do admin carregado na aplicação, não chamar novamente
			if (store.contentHasBeenLoaded) return;

			await store.getContentApp(useToast);
		},
		{ global: true }
	);
});
