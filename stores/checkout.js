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
			formRegister: {
				// Parte 1
				email: '',
				password: '',
				confirmPassword: '',
				terms: false,

				// Parte 2
				name: '',
				phone: '',
				cpf: '',
				loading: false,

				// payment
				optionsPayment: [
					{
						value: 501,
						label: 'Pix',
						icon: 'i-ic-round-pix',
						path: '/checkout/pagamento-pix',
					},
					{
						value: 301,
						label: 'Cartão de crédito',
						icon: 'i-ic-baseline-credit-card',
						path: '/checkout/pagamento-cartao',
					},
				],
				configPayment: {
					labelButton: 'escolha antes de continuar...',
					choicePathTo: null,
				},
				selectedPayment: null,
			},
		};
	},

	getters: {
		// Form register
		enableButtonNextOne: (state) => {
			return (
				state.formRegister.email &&
				state.formRegister.password &&
				state.formRegister.confirmPassword &&
				state.formRegister.terms
			);
		},
		enableButtonNextTwo: (state) => {
			return (
				state.formRegister.name &&
				state.formRegister.phone &&
				state.formRegister.cpf
			);
		},
	},

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
			this.steps.forEach((item, index) => {
				if (item.step === stepsMod[index].step) {
					item.complete = stepsMod[index].complete;
				}
			});

			this.progressPurchaseStatus = progress;
			this.showingSteps = showStep;
		},

		// Registro de Email
		async registerEmail(useToast, IDpkgChosen, pathTo) {
			const toast = useToast();
			this.formRegister.loading = true;

			const {
				ApiIncentiveSystemIdentity,
				ApiIncentiveClientId,
				ApiIncentiveClientSecret,
			} = useRuntimeConfig().public;

			try {
				const data = await $fetch(
					`${ApiIncentiveSystemIdentity}account/user/email`,
					{
						method: 'post',
						body: {
							clientId: ApiIncentiveClientId,
							clientSecret: ApiIncentiveClientSecret,
							userInfo: this.formRegister.email,
							password: this.formRegister.password,
						},
						headers: {
							Authorization: `Bearer ${useCookie('tokenClient').value}`,
						},
					}
				);

				const cookieAuth = useCookie('tokenUser', {
					maxAge: +data.expires_in,
					sameSite: true,
					httpOnly: false,
				});
				cookieAuth.value = data.access_token;

				this.purchasePackage(IDpkgChosen, pathTo);
			} catch (error) {
				toast.add({
					id: 'error_getContentAppLoginUser',
					title: `${
						enumsResponseServer(error.response._data.request.code).title
					}`,
					description: `${
						enumsResponseServer(error.response._data.request.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			this.formRegister.loading = false;
		},

		// Registro de Email
		async registerOthersDatas(useToast, IDpkgChosen, pathTo) {
			const toast = useToast();
			this.formRegister.loading = true;

			const { ApiIncentiveSystemIdentity } = useRuntimeConfig().public;

			try {
				// Nome
				await $fetch(`${ApiIncentiveSystemIdentity}account/user/details`, {
					method: 'post',
					body: {
						name: this.formRegister.name,
						occupation: 'Sem Ocupação',
						monthlyIncome: '0',
					},
					headers: {
						Authorization: `Bearer ${useCookie('tokenUser').value}`,
					},
				});

				// Telefone
				await $fetch(`${ApiIncentiveSystemIdentity}account/user/phone`, {
					method: 'post',
					body: {
						phoneNumber: this.formRegister.phone,
						phoneType: 'Mobile',
						countryCode: 55,
					},
					headers: {
						Authorization: `Bearer ${useCookie('tokenUser').value}`,
					},
				});

				// CPF
				await $fetch(`${ApiIncentiveSystemIdentity}account/user/document`, {
					method: 'post',
					body: {
						documentType: 102,
						documentNumber: this.formRegister.cpf,
					},
					headers: {
						Authorization: `Bearer ${useCookie('tokenUser').value}`,
					},
				});

				this.purchasePackage(IDpkgChosen, pathTo);
			} catch (error) {
				toast.add({
					id: 'error_getContentAppLoginUser',
					title: `${
						enumsResponseServer(error.response._data.request.code).title
					}`,
					description: `${
						enumsResponseServer(error.response._data.request.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			this.formRegister.loading = false;
		},

		// Escolha do Método de Pagamento
		changeMethodPayment(method) {
			this.formRegister.configPayment.labelButton = `pagar com ${method.label}`;
			this.formRegister.configPayment.choicePathTo = method.path;
		},
		async paymentMethod(useToast, IDpkgChosen, pathTo) {
			// Caso o método seja cartão
			if (this.formRegister.selectedPayment === 301) {
				return this.purchasePackage(IDpkgChosen, pathTo);
			}

			// Caso o método seja Pix
			if (this.formRegister.selectedPayment === 501) {
				await this.paymentPix(useToast, IDpkgChosen, pathTo);
			}
		},

		// Pagamento via Pix
		async paymentPix(useToast, IDpkgChosen, pathTo) {
			const toast = useToast();
			this.formRegister.configPayment.labelButton = `Aguarde o processamento`;
			this.formRegister.loading = true;

			const { ApiIncentiveSystemContents } = useRuntimeConfig().public;

			try {
				await $fetch(
					`${ApiIncentiveSystemContents}store/content/${this.packageChosen.id}`,
					{
						method: 'post',
						body: {
							amount: 1,
							paymentType: 501,
						},
						headers: {
							Authorization: `Bearer ${useCookie('tokenUser').value}`,
						},
					}
				);

				this.purchasePackage(IDpkgChosen, pathTo);
			} catch (error) {
				console.log(error);
				toast.add({
					id: 'error_PaymentPix',
					title: `${
						enumsResponseServer(error.response._data.request.code).title
					}`,
					description: `${
						enumsResponseServer(error.response._data.request.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			this.formRegister.loading = false;
		},
	},
});
