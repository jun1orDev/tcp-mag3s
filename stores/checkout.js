import { useStoreApp } from './app';

export const useStoreCheckout = defineStore('storeCheckout', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			packages: [],
			packageChosen: null,
			showingSteps: false,
			steps: [
				{ step: 1, label: 'Cadastro/Login', complete: false },
				{ step: 2, label: 'Pagamento', complete: false },
				{ step: 3, label: 'Confirmação', complete: false },
			],
			progressPurchaseStatus: 0,
		};
	},

	getters: {},

	actions: {
		// Loja
		async storePackages(useToast) {
			if (this.packages.length) return;
			const app = useStoreApp().contentApp;
			const toast = useToast();
			const { ApiIncentiveSystemContents } = useRuntimeConfig().public;

			try {
				const data = await $fetch(`${ApiIncentiveSystemContents}store`, {
					method: 'get',
					headers: {
						Authorization: `Bearer ${useCookie('tokenClient').value}`,
					},
				});

				// Obtendo o produto mais popular
				const prices = data[0].content.map((price) => price.price);
				const popularProduct = searchValuePopular(prices);

				// Obtendo a lista dos pacotes formatados a serem vendidos
				data[0].content.forEach((item, index) => {
					const hasPopularProduct = popularProduct === item.price;

					this.packages.push({
						id: item.id,
						isPopularProduct: hasPopularProduct,
						image: app.purchase_tables_images_list.list[index]
							? app.purchase_tables_images_list.list[index].one
							: '',
						price: item.price,
						items: item.baseContent.subContents.map((content) => {
							return { qtd: content.amount, description: content.description };
						}),
					});
				});
			} catch (error) {
				toast.add({
					id: 'error_client_token',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},

		// Compra do pacote escolhido
		purchasePackage(IDpkgChosen, pathTo) {
			this.chosenPackage(IDpkgChosen);

			navigateTo({
				path: pathTo,
				query: {
					idPkg: IDpkgChosen,
				},
			});
		},

		// escolha do pacote
		chosenPackage(id) {
			this.packageChosen = this.packages.find((item) => item.id === id);
		},

		// Progresso da compra
		progressPurchase(stepsMod, progress, showStep) {
			this.steps.forEach((item,index) => {
				if (item.step === stepsMod[index].step) {
					item.complete = stepsMod[index].complete;
				}
			});

			this.progressPurchaseStatus = progress;
			this.showingSteps = showStep;
		},
	},
});
