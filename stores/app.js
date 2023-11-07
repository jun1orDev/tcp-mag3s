export const useStoreApp = defineStore('storeApp', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			contentApp: {},
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
			drawnNumbersToday: ['01', '03', '08', '12', '44', '30', '64'],
			luckyNumersUser: [
				{
					numbers: [
						{ number: '01', status: '' },
						{ number: '02', status: '' },
						{ number: '03', status: '' },
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
						{ number: '05', status: '' },
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
				{
					numbers: [
						{ number: '01', status: '' },
						{ number: '02', status: '' },
						{ number: '30', status: '' },
						{ number: '04', status: '' },
						{ number: '05', status: '' },
						{ number: '06', status: '' },
						{ number: '07', status: '' },
					],
				},
			],
			LuckyNumbersWereDrawn: false,
			loading: false,
		};
	},

	getters: {},

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
					this.revealDrawnNumber(1000);
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
			// Obtendo o resultado do sorteio
			for (const number of this.drawnNumbersToday) {
				await new Promise((resolve) =>
					setTimeout(() => {
						this.luckyNumersUser.forEach((element) => {
							element.numbers.forEach((dozens) => {
								if (dozens.number === number) {
									dozens.status = 'nailed';
								}
							});
						});
						resolve();
					}, timer)
				);
			}

			// Obtendo a dezena sorteada caso tenha
			this.luckyNumersUser.forEach((element) => {
				const wasTenDrawn = element.numbers.every(
					(dozens, index) => dozens.number === this.drawnNumbersToday[index]
				);

				if (wasTenDrawn) {
					this.LuckyNumbersWereDrawn = true;
					element.numbers.forEach((dozens) => {
						dozens.status = 'awarded';
					});
					return;
				}
			});

			if (this.LuckyNumbersWereDrawn) {
				setTimeout(() => {
					this.openModalPrizeResult(
						this.contentApp.modal_text_prize_title_three,
						this.contentApp.modal_text_prize_subtitle_three,
						this.contentApp.modal_text_prize_label_three,
						'details'
					);
				}, 1000);
			} else {
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
