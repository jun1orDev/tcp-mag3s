import { useStoreApp } from './app';
import { useStoreCheckout } from './checkout';
import { getCookie, enumsResponseServer } from '../utils/helpers';

export const useStoreIncentive = defineStore('storeIncentive', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			userAcountData: {
				name: '',
				email: '',
				status: null,
				cpf: null,
				phone: null,
				addresses: null,
				paymentMethods: {
					status: null,
					id: null,
					number: null,
					name: null,
					validity: null,
					cvv: null,
				},
				loading: false,
			},
			inventory: {
				loading: false,
				luckyNumbers: [],
				lotteryPrizesWonFilter: null,
				allPrizes: [],
				choosePrizeDetails: null,
			},
			gamification: {
				lotteryDraws: {
					lastDrawHeld: {
						id: null,
						loading: false,
					},
					nextDraw: {
						id: null,
						loading: false,
					},
					listDraws: {
						id: null,
						loading: false,
					},
					listDrawsUpcoming: [],
					listDrawsLatest: [],
					revealChosenDraw: {
						loading: false,
						showDrawnNumbersToday: false,
					},
					LuckyNumbersWereDrawn: null,
				},
				qtdScratchCard: 0,
			},
			formLogin: {
				user: '',
				password: '',
			},
			resetUser: {
				email: '',
				callbackURL: '',
				password: '',
				confirmPassword: '',
			},
			userLoggedIn: null,
			filterPrizes: 2,
			loading: true,
		};
	},

	getters: {
		// Dados do usuário
		firstUserName: (state) => {
			if (state.userAcountData.name)
				return state.userAcountData.name.split(' ')[0];
			else return state.userAcountData.email;
		},

		// Rapadinha
		hasScratchCardQtd: (state) => {
			return +state.gamification.qtdScratchCard > 0;
		},

		// Sorteios realizados
		lastDrawHeldLink: (state) => {
			if (state.gamification.lotteryDraws.lastDrawHeld.loading)
				return `/app/revelar-premio/${state.gamification.lotteryDraws.lastDrawHeld.id}`;

			return '';
		},
		lastDrawHeldFull: (state) => {
			return state.gamification.lotteryDraws.lastDrawHeld;
		},
		lastDrawLoading: (state) => {
			return state.gamification.lotteryDraws.lastDrawHeld.loading;
		},

		// Próximos sorteios
		NextDrawLink: (state) => {
			const app = useStoreApp().contentApp;

			if (state.gamification.lotteryDraws.nextDraw.loading) {
				if (state.nextDrawDateIsBefore) {
					if (app.config_will_have_raffle)
						return app.banner_link_before_prize_draw_card_hub;

					return `/app/revelar-premio/${state.gamification.lotteryDraws.nextDraw.id}`;
				}

				return false;
			}

			return '';
		},
		nextDrawFull: (state) => {
			return state.gamification.lotteryDraws.nextDraw;
		},
		nextDrawDate: (state) => {
			if (state.gamification.lotteryDraws.nextDraw.loading) {
				if (state.nextDrawDateIsBefore) return false;
				return state.gamification.lotteryDraws.nextDraw.date;
			}
			return null;
		},
		nextDrawDateIsBefore: (state) => {
			const { $checkDatePassed } = useNuxtApp();

			if (state.gamification.lotteryDraws.nextDraw.loading)
				return $checkDatePassed(state.gamification.lotteryDraws.nextDraw.date);

			return false;
		},
		nextDrawLoading: (state) => {
			return state.gamification.lotteryDraws.nextDraw.loading;
		},
		listDrawsUpcomingLimited: (state) => {
			return (payload) =>
				state.gamification.lotteryDraws.listDrawsUpcoming.slice(0, payload);
		},

		// Sorteio Escolhido
		loadingChosenDrawFull: (state) => {
			return state.gamification.lotteryDraws.listDraws.loading;
		},
		revealChosenDrawFull: (state) => {
			return state.gamification.lotteryDraws.revealChosenDraw;
		},
		revealChosenDrawDateYearFull: (state) => {
			return state.gamification.lotteryDraws.revealChosenDraw
				.fullDateYearComplete;
		},
		showDrawnNumbersToday: (state) => {
			return state.gamification.lotteryDraws.revealChosenDraw
				.showDrawnNumbersToday;
		},
		drawnNumbersToday: (state) => {
			if (state.showDrawnNumbersToday)
				return state.gamification.lotteryDraws.revealChosenDraw.drawnNumber[0]
					.dozens;

			return null;
		},

		// Inventário do usuário
		loadingInventory: (state) => {
			return state.inventory.loading;
		},
		luckyNumbersUser: (state) => {
			if (state.inventory) return state.inventory.luckyNumbers;
			return [];
		},
		lotteryPrizesWonFilter: (state) => {
			if (state.inventory.loading) {
				return state.inventory.lotteryPrizesWonFilter;
			}
		},
		hasLotteryPrizesWon: (state) => {
			if (state.inventory.loading) {
				return state.inventory.lotteryPrizesWon.length > 0;
			}
		},
		hasLotteryPrizesWonFilter: (state) => {
			if (state.inventory.loading) {
				return state.inventory.lotteryPrizesWonFilter.length > 0;
			}
		},

		// Detalhes do Prêmio Escolhido
		choosePrizeDetails: (state) => {
			if (state.inventory.loading) return state.inventory.choosePrizeDetails;
			return '';
		},
	},

	actions: {
		// Login do Client (utilizado para recuperar senha, cadastrar novo usuário, etc...)
		async clientLogin(useToast) {
			const toast = useToast();
			const {
				ApiIncentiveSystemIdentity,
				ApiIncentiveClientId,
				ApiIncentiveClientSecret,
				ApiIncentiveKeyValue,
			} = useRuntimeConfig().public;

			try {
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

		// Login do usuário
		async userLogin(useToast, hasHostsite = true, isCheckout = false) {
			this.loading = false;
			const storeCheckout = useStoreCheckout();
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
						userInfo: hasHostsite ? this.formLogin.user : ApiIncentiveUserTest,
						password: hasHostsite
							? this.formLogin.password
							: ApiIncentivePassTest,
					},
				});

				if (hasHostsite) {
					const cookieAuth = useCookie('tokenUser', {
						maxAge: +data.expires_in,
						sameSite: true,
						httpOnly: false,
					});
					cookieAuth.value = data.access_token;
					this.loading = false;
					this.formLogin.user = '';
					this.formLogin.password = '';

					// Reset store checkout

					if (isCheckout) {
						navigateTo({
							path: '/checkout/cadastro2',
							query: {
								idPkg: storeCheckout.packageChosen.id,
								idOB: storeCheckout.packageChosenOB.id,
							},
						});
					} else {
						navigateTo({
							path: '/app/hub',
						});
					}
				}

				this.loading = false;
				this.formLogin.user = '';
				this.formLogin.password = '';
				return data;
			} catch (error) {
				this.loading = true;
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
		},

		// Reset de senha
		async userReset(useToast) {
			this.loading = false;
			const toast = useToast();

			const { ApiIncentiveSystemIdentity } = useRuntimeConfig().public;

			try {
				const data = await $fetch(
					`${ApiIncentiveSystemIdentity}account/user/password/reset`,
					{
						method: 'post',
						body: {
							userInfo: this.resetUser.email,
							code: `Requisição de nova senha`,
							callbackURL: `${window.location.protocol}//${window.location.host}/confirmar-senha/`,
						},
					}
				);

				this.resetUser.email = '';

				if (data.success) {
					toast.add({
						id: 'info_reset_password',
						title: `Solicitação enviada!`,
						description: `E-mail enviado com sucesso.`,
						color: 'green',
						icon: 'i-material-symbols-check-circle-outline-rounded',
						timeout: 3500,
					});

					navigateTo('/login');
				}

				this.loading = true;
			} catch (error) {
				this.loading = true;
				toast.add({
					id: 'error_reset_password',
					title: `${enumsResponseServer(error.response._data.code).title}`,
					description: `${
						enumsResponseServer(error.response._data.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},

		// Confirmação de senha
		async confirmResetPassword(useToast) {
			this.loading = false;
			const toast = useToast();
			const route = useRoute();

			const { ApiIncentiveSystemIdentity } = useRuntimeConfig().public;

			try {
				const data = await $fetch(
					`${ApiIncentiveSystemIdentity}account/user/password/reset/code`,
					{
						method: 'put',
						body: {
							userInfo: this.resetUser.email,
							code: decodeURIComponent(route.path.split('/').pop()),
							password: this.resetUser.password,
							confirmPassword: this.resetUser.confirmPassword,
						},
						headers: {
							Authorization: `Bearer ${useCookie('tokenClient').value}`,
						},
					}
				);

				if (data.success) {
					toast.add({
						id: 'info_reset_password',
						title: `Senha alterada com sucesso!`,
						color: 'green',
						icon: 'i-material-symbols-check-circle-outline-rounded',
						timeout: 3500,
					});

					navigateTo('/login');
				}

				this.loading = true;
			} catch (error) {
				this.loading = true;
				toast.add({
					id: 'error_reset_password',
					title: `${enumsResponseServer(error.response._data.code).title}`,
					description: `${
						enumsResponseServer(error.response._data.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},

		//alterar dados
		editProfile() {},

		// Saindo da aplicação
		userLogout(useToast) {
			const toast = useToast();
			const router = useRouter();
			const cookieAuth = useCookie('tokenUser');

			cookieAuth.value = null;
			this.loading = true;

			toast.add({
				id: 'error_logOutUser',
				title: `Atenção!`,
				description: `Faça o login novamente para entrar.`,
				color: 'red',
				icon: 'i-material-symbols-warning-outline-rounded',
				timeout: 3500,
			});

			router.push({ path: '/login' });
		},

		// Dados do usuário
		async userAccount(useToast) {
			if (this.userAcountData.loading) return;
			console.log('buscando dados do usuário');

			const toast = useToast();
			const { ApiIncentiveSystemIdentity } = useRuntimeConfig().public;

			try {
				const data = await $fetch(`${ApiIncentiveSystemIdentity}account/user`, {
					method: 'get',
					headers: {
						Authorization: `Bearer ${useCookie('tokenUser').value}`,
					},
				});

				this.userAcountData.name = data.name;
				this.userAcountData.email = data.email;
				this.userAcountData.status = data.status;
				if (data.documents.length) {
					this.userAcountData.cpf = data.documents[0].documentNumber;
				}
				if (data.phones.length) {
					this.userAcountData.phone = `${data.phones[0].cityCode}${data.phones[0].phoneNumber}`;
				}
				this.userAcountData.addresses = data.addresses;

				if (data.paymentMethods.length) {
					this.userAcountData.paymentMethods = {
						status: data.paymentMethods[0].status,
						id: data.paymentMethods[0].id,
						number: data.paymentMethods[0].numbers,
						name: data.paymentMethods[0].holder,
						validity: data.paymentMethods[0].expirationDate,
						cvv: data.paymentMethods[0].code,
					};
				} else {
					this.userAcountData.paymentMethods = {
						status: null,
						id: null,
						number: null,
						name: null,
						validity: null,
						cvv: null,
					};
				}

				this.userAcountData.loading = true;
			} catch (error) {
				toast.add({
					id: 'error_getContentAppLoginUser',
					title: `${enumsResponseServer(error).title}`,
					description: `${enumsResponseServer(error).message}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},

		// Inventário do usuário
		async userInventory(useToast) {
			// Caso exista inventário no state não buscar informações
			if (this.inventory.loading) return;
			console.log('buscando dados do Inventário');

			const storeApp = useStoreApp();
			const toast = useToast();

			const { ApiIncentiveSystemContents } = useRuntimeConfig().public;

			try {
				const data = await $fetch(
					`${ApiIncentiveSystemContents}user/inventory`,
					{
						method: 'get',
						headers: {
							Authorization: `Bearer ${getCookie('tokenUser')}`,
						},
					}
				);

				// Inventário do usuário
				this.inventory = {
					userId: data.userId,
					luckyNumbers: this.luckyNumbers(data.luckyNumbers),
					lotteryPrizes: data.lotteryPrizes,
					lotteryPrizesWon: data.lotteryPrizes
						.filter(
							(prizeItem) =>
								prizeItem.status === 991 || prizeItem.status === 311
						)
						.map((prize) => {
							return {
								id: prize.id,
								name: prize.baseContent.name,
								image: prize.baseContent.images.find(
									(img) => img.subType === 'Splash'
								).uri,
								typePrize: prize.baseContent.coreSubType,
								prizeTypeStyle:
									prize.baseContent.coreSubType === 'ScratchCard'
										? false
										: true,
							};
						}),
					choosePrizeDetails: null,
					allPrizes: [],
				};

				// Filtro para Prêmio ganhados pelo usuário
				this.inventory.lotteryPrizesWonFilter = this.inventory.lotteryPrizesWon;

				// Lista com todos os prêmios (Rabiscadinhas e Números da sorte)
				this.inventory.lotteryPrizesWon.forEach((item) => {
					this.inventory.allPrizes.push(item);
				});

				// Saldo de raspadinhas
				this.gamification.qtdScratchCard = data.scratchCards.filter(
					(scratchCard) => scratchCard.status === 202
				).length;
				storeApp.selectMenuBehaviour(
					2,
					'badge',
					this.gamification.qtdScratchCard
				);

				this.inventory.loading = true;
			} catch (error) {
				toast.add({
					id: 'error_getContentAppInventory',
					title: `Erro: ${error}`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},
		// $resetUserInventory() {
		// 	this.inventory = null;
		// },

		// Sorteios
		async lotteryDraws(useToast) {
			// Caso exista sorteiios no state não buscar informações
			if (this.gamification.lotteryDraws.lastDrawHeld.loading) return;
			console.log('buscando dados dos sorteios');

			const {
				$mostRecentDate,
				$formatDayMonthYearFull,
				$formatDayMonthYearComplete,
			} = useNuxtApp();
			const toast = useToast();

			const { ApiIncentiveSystemContents } = useRuntimeConfig().public;

			// Sorteios Realizados
			try {
				const data = await $fetch(
					`${ApiIncentiveSystemContents}lottery/luckynumbers/drawns/`,
					{
						method: 'get',
						headers: {
							Authorization: `Bearer ${getCookie('tokenUser')}`,
						},
					}
				);

				// Lista de todos os sorteios já realizados
				data.lotteryDraws.forEach((draw) => {
					this.gamification.lotteryDraws.listDrawsLatest.push({
						id: draw.id,
						name: draw.content.name,
						description: draw.content.description,
						fullDate: $formatDayMonthYearFull(draw.divulgationDate),
						fullDateYearComplete: $formatDayMonthYearComplete(
							draw.divulgationDate
						),
						date: draw.divulgationDate,
						drawnNumber: this.luckyNumbers(
							Array({ luckyNumber: String(draw.extractedDrawnNumber) })
						),
						image: draw.content.images.find((img) => img.subType === 'Splash')
							.uri,
					});
				});

				// Obtendo um Objeto contendo as informações do último sorteio realizado
				const datesDraws = data.lotteryDraws.map(
					(item) => item.divulgationDate
				);
				const mostRecentDate = $mostRecentDate(datesDraws, 'max');
				this.gamification.lotteryDraws.lastDrawHeld =
					this.gamification.lotteryDraws.listDrawsLatest.find(
						(item) => item.fullDate === $formatDayMonthYearFull(mostRecentDate)
					);

				this.gamification.lotteryDraws.lastDrawHeld.loading = true;
			} catch (error) {
				toast.add({
					id: 'error_getContentAppPreviousDraws',
					title: `Erro: ${error}`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			// Próximos Sorteios
			try {
				const data = await $fetch(
					`${ApiIncentiveSystemContents}lottery/luckynumbers/draws/`,
					{
						method: 'get',
						headers: {
							Authorization: `Bearer ${getCookie('tokenUser')}`,
						},
					}
				);

				// Lista de todos os próximos sorteios
				data.lotteryDraws.forEach((draw) => {
					this.gamification.lotteryDraws.listDrawsUpcoming.push({
						id: draw.id,
						name: draw.content.name,
						description: draw.content.description,
						fullDate: $formatDayMonthYearFull(draw.divulgationDate),
						fullDateYearComplete: $formatDayMonthYearComplete(
							draw.divulgationDate
						),
						date: draw.divulgationDate,
						drawnNumber: this.luckyNumbers(
							Array({ luckyNumber: String(draw.extractedDrawnNumber) })
						),
						image: draw.content.images.find((img) => img.subType === 'Splash')
							.uri,
					});
				});

				// Obtendo um Objeto contendo as informações do próximo sorteio
				const datesDraws = data.lotteryDraws.map(
					(item) => item.divulgationDate
				);
				const mostRecentDate = $mostRecentDate(datesDraws, 'min');

				if (this.gamification.lotteryDraws.listDrawsUpcoming.length) {
					this.gamification.lotteryDraws.nextDraw =
						this.gamification.lotteryDraws.listDrawsUpcoming.find(
							(item) =>
								item.fullDate === $formatDayMonthYearFull(mostRecentDate)
						);
				}

				this.gamification.lotteryDraws.nextDraw.loading = true;
			} catch (error) {
				toast.add({
					id: 'error_getContentAppNextDraws',
					title: `Erro: ${error}`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			// Lista com todos os sorteios
			this.gamification.lotteryDraws.listDraws =
				this.gamification.lotteryDraws.listDrawsLatest.concat(
					this.gamification.lotteryDraws.listDrawsUpcoming
				);

			this.gamification.lotteryDraws.listDraws.loading = true;
		},
		// $resetLotteryDraws() {
		// 	this.gamification.lotteryDraws.lastDrawHeld = null;
		// },
		revealChosenDraw(idDraw) {
			this.gamification.lotteryDraws.revealChosenDraw =
				this.gamification.lotteryDraws.listDraws.find(
					(draw) => draw.id === idDraw
				);
		},
		$resetRevealChosenDraw() {
			this.gamification.lotteryDraws.revealChosenDraw.fullDate = null;
		},
		async revealDrawnNumber(timer) {
			let foundNumberDrawn = false;

			// Obtendo o resultado do sorteio
			for (const [index, drawToday] of this.drawnNumbersToday.entries()) {
				await new Promise((resolve) =>
					setTimeout(() => {
						this.luckyNumbersUser.forEach((element) => {
							foundNumberDrawn = false;
							element.dozens.find((dozens, i, arr) => {
								if (foundNumberDrawn) return;

								this.drawnNumbersToday[index].status = 'awarded';

								if (arr[index].number === drawToday.number) {
									arr[index].status = 'nailed';
									foundNumberDrawn = true;

									// Ordernar a lista assim que os números
									this.luckyNumbersUser.sort((a, b) => {
										// Função que conta quantos elementos têm status 'neiland' em uma subarray
										const contarNeiland = (arr) =>
											arr.filter((item) => item.status === 'nailed').length;

										const contagemA = contarNeiland(a.dozens);
										const contagemB = contarNeiland(b.dozens);

										// Ordene de forma decrescente com base no número de elementos com status 'neiland'
										return contagemB - contagemA;
									});
								}
							});
						});
						resolve();
					}, timer)
				);
			}

			// Obtendo a lista de 7 dezenas sorteadas caso tenha
			let wasTenDrawn = false;
			let breakLoop = false;

			function setLuckyNumberWD(arr) {
				arr.forEach((dozens) => {
					dozens.status = 'awarded';
				});
			}

			this.luckyNumbersUser.forEach((element) => {
				if (breakLoop) return;

				wasTenDrawn = element.dozens.every(
					(dozens, index) =>
						dozens.number === this.drawnNumbersToday[index].number
				);

				if (wasTenDrawn) {
					setLuckyNumberWD(element.numbers);
					breakLoop = true;
				}
			});

			const storeApp = useStoreApp();
			if (wasTenDrawn) {
				this.gamification.lotteryDraws.LuckyNumbersWereDrawn = true;
				setTimeout(() => {
					storeApp.openModalPrizeResult(
						storeApp.contentApp.modal_text_prize_title_three,
						storeApp.contentApp.modal_text_prize_subtitle_three,
						storeApp.contentApp.modal_text_prize_label_three,
						'details'
					);
				}, 1000);
			} else {
				this.gamification.lotteryDraws.LuckyNumbersWereDrawn = false;
				setTimeout(() => {
					storeApp.openModalPrizeResult(
						storeApp.contentApp.modal_text_prize_title_two,
						storeApp.contentApp.modal_text_prize_subtitle_two,
						storeApp.contentApp.modal_text_prize_label_two,
						'back'
					);
				}, 1000);
			}
		},

		// Funções auxiliares
		luckyNumbers(numbersData) {
			let numbers = [];

			// Obtendo os número da propriedade luckyNumber para cada sequência de 4 e juntando em um string
			numbersData.forEach((element) => {
				numbers.push({ number: `0${element.luckyNumber}`, id: element.id });
			});

			// Separando os números em dezenas de forma sequencial e inserindo em uma array
			return numbers.map((str) => {
				const dozens = [];
				for (let i = 0; i < str.number.length; i += 2) {
					dozens.push({ number: str.number.substr(i, 2), status: '' });
				}
				return { dozens, id: str.id };
			});
		},
		filterLotteryPrizesWon(filter) {
			if (!filter)
				return (this.inventory.lotteryPrizesWonFilter =
					this.inventory.lotteryPrizesWon);
			this.inventory.lotteryPrizesWonFilter =
				this.inventory.lotteryPrizesWon.filter(
					(item) => item.typePrize === filter
				);
		},
		prizeDetails(id) {
			this.inventory.choosePrizeDetails = this.inventory.allPrizes.find(
				(prize) => prize.id === id
			);
		},
	},
});
