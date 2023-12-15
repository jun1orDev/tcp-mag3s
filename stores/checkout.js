import { useStoreApp } from './app';

export const useStoreCheckout = defineStore('storeCheckout', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			packages: [],
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
						image: app.purchase_tables_images_list.list[index] ? app.purchase_tables_images_list.list[index].one : '',
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
	},
});
