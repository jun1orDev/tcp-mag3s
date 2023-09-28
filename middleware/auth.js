export default defineNuxtRouteMiddleware((to, from) => {
	const cookieAuth = useCookie('idUser');

	const toast = useToast();

	if (!cookieAuth.value) {
		toast.add({
			id: 'show_status_login',
			color: `red`,
			title: `Atenção`,
			icon: `i-material-symbols-warning-outline-rounded`,
			description: `Faça o Login para Continuar`,
			timeout: 3500,
		});

		return navigateTo({ path: '/admin/login' });
	}
});
