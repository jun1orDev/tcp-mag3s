import { useStoreApp } from './app';

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
					listDraws: null,
					listDrawsUpcoming: [],
					listDrawsLatest: [],
					revealChosenDraw: {
						loading: false,
						showDrawnNumbersToday: false,
					},
					LuckyNumbersWereDrawn: null,
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

		// Sorteio Escolhido
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
			return state.gamification.lotteryDraws.revealChosenDraw.drawnNumber[0]
				.dozens;
		},

		// Inventário do usuário
		luckyNumbersUser: (state) => {
			if (state.inventory) return state.inventory.luckyNumbers;
			return '';
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

			const {
				$mostRecentDate,
				$formatDayMonthYearFull,
				$formatDayMonthYearComplete,
			} = useNuxtApp();
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
							Authorization: `Bearer ${cookieAuth.value}`,
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

			// Lista com todos os sorteios
			this.gamification.lotteryDraws.listDraws =
				this.gamification.lotteryDraws.listDrawsLatest.concat(
					this.gamification.lotteryDraws.listDrawsUpcoming
				);
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
