export const useStoreAdmin = defineStore('storeAdmin', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			login: {
				email: '',
				password: '',
			},
			logout: false,
			content: [],
			loading: false,
		};
	},

	actions: {
		async getContent() {
			try {
				const { data, status } = await useFetch('/api/medias', {
					method: 'get',
					credentials: 'include',
				});

				if (status.value === 'success') this.content = data.value.data;
			} catch (error) {
				console.log(error);
			}
		},

		async getLoading() {




			this.loading = false;
		},
	},
});
