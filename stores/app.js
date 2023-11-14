export const useStoreApp = defineStore('storeApp', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			contentApp: {},
			apiData: {
				qtdScratchCard: '08',
			},
			footerApp: {
				menu: [
					{ label: 'perguntas', link: '/faq' },
					{ label: 'termos de uso', link: '/termos' },
					{ label: 'regulamento', link: '/regulamento' },
				],
			},
			contentHasBeenLoaded: false,
			modalPrize: {
				isOpenModalPrizeResult: false,
				title: '',
				subtitle: '',
				labelButton: '',
				typeAction: '',
			},
			showDrawnNumbersToday: false,
			drawnNumbersToday: [
				{ number: '01', status: '' },
				{ number: '02', status: '' },
				{ number: '44', status: '' },
				{ number: '04', status: '' },
				{ number: '05', status: '' },
				{ number: '06', status: '' },
				{ number: '07', status: '' },
			],
			luckyNumersUser: [
				{
					numbers: [
						{ number: '78', status: '' },
						{ number: '02', status: '' },
						{ number: '44', status: '' },
						{ number: '04', status: '' },
						{ number: '05', status: '' },
						{ number: '06', status: '' },
						{ number: '07', status: '' },
					],
				},
				{
					numbers: [
						{ number: '01', status: '' },
						{ number: '03', status: '' },
						{ number: '08', status: '' },
						{ number: '12', status: '' },
						{ number: '44', status: '' },
						{ number: '30', status: '' },
						{ number: '01', status: '' },
					],
				},
				{
					numbers: [
						{ number: '66', status: '' },
						{ number: '02', status: '' },
						{ number: '44', status: '' },
						{ number: '04', status: '' },
						{ number: '05', status: '' },
						{ number: '06', status: '' },
						{ number: '88', status: '' },
					],
				},
				{
					numbers: [
						{ number: '01', status: '' },
						{ number: '02', status: '' },
						{ number: '44', status: '' },
						{ number: '04', status: '' },
						{ number: '05', status: '' },
						{ number: '06', status: '' },
						{ number: '07', status: '' },
					],
				},
			],
			LuckyNumbersWereDrawn: null,
			loading: false,
		};
	},

	getters: {
		hasScratchCardQtd: (state) => {
			return +state.apiData.qtdScratchCard > 0;
		},
		titleCardScratchQtd: (state) => {
			if(state.hasScratchCardQtd) return state.contentApp.banner_text_card_title_two;
			return state.contentApp.banner_text_card_title_five;
		},

		subtitleCardScratchQtd: (state) => {
			if(state.hasScratchCardQtd) return state.contentApp.banner_text_card_subtitle_two;
			return state.contentApp.banner_text_card_subtitle_three;
		},		

		linkCardScratchQtd: (state) => {
			if(state.hasScratchCardQtd) return '/app/gamification';
			return '';
		},		

		callToActionCardScratchQtd: (state) => {
			if(state.hasScratchCardQtd) return state.contentApp.banner_text_card_label_button_two;
			return false;
		},		
	},

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

		openModalPrizeResult(title, subtitle, labelButton, typeAction) {
			this.modalPrize.title = title;
			this.modalPrize.subtitle = subtitle;
			this.modalPrize.labelButton = labelButton;
			this.modalPrize.typeAction = typeAction;

			this.modalPrize.isOpenModalPrizeResult = true;
		},

		// Action Prize
		callToActionPrize() {
			const router = useRouter();
			this.modalPrize.isOpenModalPrizeResult = false;

			switch (this.modalPrize.typeAction) {
				case 'reveal':
					this.showDrawnNumbersToday = true;
					this.revealDrawnNumber(1500);
					console.log('chamar função que revela o prêmio');
					break;
				case 'back':
					router.go(-1);
					break;
				case 'details':
					router.push('/app/detalhes-premio');
					break;

				default:
					console.log('o modal foi fechado apenas!');
					break;
			}
		},
		
		async revealDrawnNumber(timer) {
			let foundNumberDrawn = false;

			// Obtendo o resultado do sorteio
			for (const [index, drawToday] of this.drawnNumbersToday.entries()) {
				await new Promise((resolve) =>
					setTimeout(() => {
						this.luckyNumersUser.forEach((element) => {
							foundNumberDrawn = false;
							element.numbers.find((dozens, i, arr) => {
								if (foundNumberDrawn) return;

								this.drawnNumbersToday[index].status = 'awarded';

								if (arr[index].number === drawToday.number) {
									arr[index].status = 'nailed';
									foundNumberDrawn = true;

									// Ordernar a lista assim que os números
									this.luckyNumersUser = this.luckyNumersUser.sort((a, b) => {
										// Função que conta quantos elementos têm status 'neiland' em uma subarray
										const contarNeiland = (arr) => arr.filter(item => item.status === 'nailed').length;

										const contagemA = contarNeiland(a.numbers);
										const contagemB = contarNeiland(b.numbers);

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

			this.luckyNumersUser.forEach((element) => {
				if (breakLoop) return;

				wasTenDrawn = element.numbers.every(
					(dozens, index) => dozens.number === this.drawnNumbersToday[index].number
				);

				if (wasTenDrawn) {
					setLuckyNumberWD(element.numbers);
					breakLoop = true;
				}
			});


			if (wasTenDrawn) {
				this.LuckyNumbersWereDrawn = true;
				setTimeout(() => {
					this.openModalPrizeResult(
						this.contentApp.modal_text_prize_title_three,
						this.contentApp.modal_text_prize_subtitle_three,
						this.contentApp.modal_text_prize_label_three,
						'details'
					);
				}, 1000);
			} else {
				this.LuckyNumbersWereDrawn = false;
				setTimeout(() => {
					this.openModalPrizeResult(
						this.contentApp.modal_text_prize_title_two,
						this.contentApp.modal_text_prize_subtitle_two,
						this.contentApp.modal_text_prize_label_two,
						'back'
					);
				}, 1000);
			}
		},
	},
});
