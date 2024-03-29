import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtPlugin((nuxt) => {
	const storeApp = useStoreApp(nuxt.$pinia);
	const storeIncentive = useStoreIncentive(nuxt.$pinia);

	addRouteMiddleware(
		'get-content-app',
		async (to, from) => {
			// Ignorar o middleware em determinadas páginas
			if (to.fullPath.includes('admin')) return;

			// Validação de usuário logado
			if (useCookie('tokenUser').value) storeIncentive.userLoggedIn = true;
			else storeIncentive.userLoggedIn = false;

			// Exibir ou não a edição de cartão de crédito no Menu Behaviour
			storeApp.selectMenuBehaviour(5, 'showing', storeApp.contentApp.config_will_have_credit_card_payments, false, 3);

			// Caso já exista conteúdo do admin carregado na aplicação, não chamar novamente
			if (storeApp.contentHasBeenLoaded) return;

			// Obtendo os dados de assets do admin
			await storeApp.getContentApp(useToast);

			// Meta Pixel Code
			if (process.client && useCookie('userAcceptCookies').value) {
				initMetaPixelCode(nuxt.$fb, storeApp.contentApp.config_meta_pixel_code_id);
			}
		},
		{ global: true }
	);

	addRouteMiddleware('accept-cookies', (to, from) => {
		// Ignorar o middleware em determinadas páginas
		if (to.fullPath.includes('admin')) return;

		const toast = useToast();
		const userCookies = useCookie('userAcceptCookies', {
			maxAge: 31536000,
		});

		// Verificar se o cookie já foi aceito
		if (process.client && !userCookies.value) {
			// Se o cookie não estiver presente, exibir a mensagem do Toast
			toast.add({
				id: 'accept_cookies',
				color: 'green',
				title: 'Aviso de Cookies 🍪',
				description:
					'Este site utiliza cookies para garantir uma experiência melhor. Ao continuar navegando, você concorda com o uso de cookies de acordo com nossa Política de Privacidade. Você pode ajustar suas preferências de cookies a qualquer momento nas configurações do seu navegador.',
				timeout: 0,
				closeButton: false,
				actions: [
					{
						label: 'Aceitar',
						click: () => {
							userCookies.value = true;
							initMetaPixelCode(
								nuxt.$fb,
								storeApp.contentApp.config_meta_pixel_code_id
							);
						},
					},
				],
			});
		}
	}, { global: true });
});
