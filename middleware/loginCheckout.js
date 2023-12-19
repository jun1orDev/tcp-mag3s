import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);

	// Caso o usuário já esteja autenticado, redirecionar para a tela de compra/cadastro do checkout
	if (storeApp.contentApp.config_will_have_hotsite) {
		if (useCookie('tokenUser').value) {
			return navigateTo({
				path: '/checkout/cadastro2',
				query: {
					idPkg: to.query.idPkg,
				},
			});
		}
	}

	return;
});
