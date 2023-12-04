import { useStoreAdmin } from '~/stores/admin';

export default defineNuxtRouteMiddleware((to, from) => {
	const app = useNuxtApp();
	const cookieAuth = useCookie('idUser');
	// const store = useStoreAdmin(app.$pinia);
	// // store.logout = true;

	if (cookieAuth.value) {
		return navigateTo({ path: '/admin/dashboard' });
	}
});
