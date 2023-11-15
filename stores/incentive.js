export const useStoreIncentive = defineStore('storeIncentive', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			loading: true,
		};
	},

	getters: {},

	actions: {
		async clientLogin() {
			const {
				ApiIncentiveSystemIdentity,
				ApiIncentiveClientId,
				ApiIncentiveClientSecret,
				ApiIncentiveKeyValue,
			} = useRuntimeConfig().public;

			const { data, error, status } = await useFetch(
				`${ApiIncentiveSystemIdentity}login/client`,
				{
					method: 'post',
					body: {
						clientId: ApiIncentiveClientId,
						clientSecret: ApiIncentiveClientSecret,
						keyValue: ApiIncentiveKeyValue,
					},
				}
			);

			return data.value;
		},
		async userLogin(hasHostsite = true, useToast) {
			const toast = useToast();
			const {
				ApiIncentiveSystemIdentity,
				ApiIncentiveClientId,
				ApiIncentiveClientSecret,
				ApiIncentiveUserTest,
				ApiIncentivePassTest,
			} = useRuntimeConfig().public;

			try {
				const data = await $fetch(`${ApiIncentiveSystemIdentity}login/user`, {
					method: 'post',
					body: {
						clientId: ApiIncentiveClientId,
						clientSecret: ApiIncentiveClientSecret,
						userInfo: hasHostsite ? '' : ApiIncentiveUserTest,
						password: hasHostsite ? '' : ApiIncentivePassTest,
					},
				});

				this.loading = false;
				return data;
			} catch (error) {
				toast.add({
					id: 'error_getContentApp',
					title: `Erro: ${error}`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},
	},
});
