export const useStoreIncentive = defineStore('storeIncentive', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			inventory: null,
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
					listDraws: [],
					listDrawsUpcoming: [],
					listDrawsLatest: [],
				},
				qtdScratchCard: '00',
			},
			loading: true,
		};
	},

	getters: {
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
			if (state.gamification.lotteryDraws.nextDraw.loading) {
				if (state.nextDrawDateIsBefore)
					return `/app/revelar-premio/${state.gamification.lotteryDraws.nextDraw.id}`;

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
	},

	actions: {
		// Login do Client (utilizado para recuperar senha, cadastrar novo usuário, etc...)
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

		// Login do usuário
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
					id: 'error_getContentAppLoginUser',
					title: `Erro: ${error}`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},

		// Inventário do usuário
		async userInventory(useToast) {
			// Caso exista inventário no state não buscar informações
			if (this.inventory) return;
			console.log('buscando dados do Inventário');

			const toast = useToast();
			const cookieAuth = useCookie('tokenUser');

			const { ApiIncentiveSystemContents } = useRuntimeConfig().public;

			try {
				const data = await $fetch(
					`${ApiIncentiveSystemContents}user/inventory`,
					{
						method: 'get',
						headers: {
							Authorization: `Bearer ${cookieAuth.value}`,
						},
					}
				);

				this.inventory = {
					userId: data.userId,
					luckyNumbers: this.luckyNumbers(data.luckyNumbers),
				};
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
		$resetUserInventory() {
			this.inventory = null;
		},

		// Sorteios
		async lotteryDraws(useToast) {
			// Caso exista sorteiios no state não buscar informações
			if (this.gamification.lotteryDraws.lastDrawHeld.loading) return;
			console.log('buscando dados dos sorteios');

			const { $mostRecentDate, $formatDayMonthYearFull } = useNuxtApp();
			const toast = useToast();
			const cookieAuth = useCookie('tokenUser');

			const { ApiIncentiveSystemContents } = useRuntimeConfig().public;

			// Sorteios Realizados
			try {
				const data = await $fetch(
					`${ApiIncentiveSystemContents}lottery/luckynumbers/drawns/`,
					{
						method: 'get',
						headers: {
							Authorization: `Bearer ${cookieAuth.value}`,
						},
					}
				);

				// Lista de todos os sorteios já realizados
				data.lotteryDraws.forEach((draw) => {
					this.gamification.lotteryDraws.listDrawsLatest.push({
						id: draw.id,
						fullDate: $formatDayMonthYearFull(draw.divulgationDate),
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
							Authorization: `Bearer ${cookieAuth.value}`,
						},
					}
				);

				// Lista de todos os próximos sorteios
				data.lotteryDraws.forEach((draw) => {
					this.gamification.lotteryDraws.listDrawsUpcoming.push({
						id: draw.id,
						fullDate: $formatDayMonthYearFull(draw.divulgationDate),
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
				this.gamification.lotteryDraws.nextDraw =
					this.gamification.lotteryDraws.listDrawsUpcoming.find(
						(item) => item.fullDate === $formatDayMonthYearFull(mostRecentDate)
					);

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
		},
		// $resetLotteryDraws() {
		// 	this.gamification.lotteryDraws.lastDrawHeld = null;
		// },

		// Funções auxiliares
		luckyNumbers(numbersData) {
			let numbers = [];

			// Obtendo os número da propriedade luckyNumber para cada sequência de 7 e juntando em um string
			numbersData.forEach((element) => {
				numbers.push(`0${element.luckyNumber}`);
			});

			// Separando os números em dezenas de forma sequencial e inserindo em uma array
			return numbers.map((str) => {
				const dozens = [];
				for (let i = 0; i < str.length; i += 2) {
					dozens.push({ number: str.substr(i, 2), status: '' });
				}
				return { dozens };
			});
		},
	},
});
