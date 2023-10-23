export const useStoreAdmin = defineStore('storeAdmin', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			login: {
				email: '',
				password: '',
			},
			logout: false,
			medias: [],
			filterMedias: [],
			tags: [],
			loading: false,
			isOpenModalMedia: false,
		};
	},

	actions: {
		async getContent(useToast) {
			const toast = useToast();

			try {
				const { data, error, status } = await useFetch('/api/admin/medias', {
					method: 'get',
					credentials: 'include',
				});

				if (status.value === 'success') {
					this.medias = data.value.data.medias;
					this.filterMedias = data.value.data.medias;
					this.tags = data.value.data.tags;
				}

				if (status.value === 'error') {
					toast.add({
						id: 'error_getContent',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 3500,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_getContent',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},

		async getLoading() {
			this.loading = false;
		},

		filterPerTag(id, tagChoice) {
			this.filterMedias = null;

			this.tags.forEach((tag) => (tag.filter = false));

			this.tags.find((tag) => {
				if (tag.id === id) {
					tag.filter = !tag.filter;
				}
			});

			if (tagChoice !== 'todos') {
				this.filterMedias = this.medias.filter(
					(media) => media.tag == tagChoice
				);
				return;
			}

			this.filterMedias = this.medias;
		},
	},
});
