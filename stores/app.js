import { navigateTo } from '#imports';

export const useStoreApp = defineStore('storeApp', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			contentApp: {
				config_will_have_hotsite: null,
				layout_background_app: null,
			},
			loading: false,
		};
	},

	getters: {},

	actions: {
		async getContentApp(useToast) {
			const toast = useToast();
			const router = useRouter();
			this.loading = true;

			try {
				const { data, error, status } = await useFetch('/api/app/medias', {
					method: 'get',
				});

				if (status.value === 'success') {
					this.contentApp = data.value.data;

					if (this.contentApp.config_will_have_hotsite) {
						router.push({ path: '/hotsite' });
					} else {
						router.push({ path: '/app/hub' });
					}
				}

				if (status.value === 'error') {
					toast.add({
						id: 'error_getContentApp',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 3500,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_getContentApp',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			this.loading = false;
		},
	},
});
