export const useStoreApp = defineStore('storeApp', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			contentApp: {
				config_will_have_hotsite: null,
				layout_background_app: null,
				brand_image_one: null,
				brand_image_two: null,
				brand_image_three: null,
			},
			contentHasBeenLoaded: false,
			loading: false,
		};
	},

	getters: {},

	actions: {
		async getContentApp(useToast) {
			this.contentHasBeenLoaded = true;
			const toast = useToast();

			try {
				const { data, error, status } = await useFetch('/api/app/medias', {
					method: 'get',
				});

				if (status.value === 'success') {
					this.contentApp = data.value.data;
					console.info('conteúdo CMS carregado');
				}

				if (status.value === 'error') {
					console.error('conteúdo CMS não carregado');
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
		},
	},
});
