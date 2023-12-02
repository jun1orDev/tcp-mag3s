import { useStoreIncentive } from './incentive';

export const useStoreApp = defineStore('storeApp', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			contentApp: {},
			showDrawnNumbersToday: false,
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
			loading: false,
		};
	},

	getters: {
		// Raspadinhas
		titleCardScratchQtd: (state) => {
			const storeIncentive = useStoreIncentive();
			const hasScratchCardQtd = storeIncentive.hasScratchCardQtd;

			if (hasScratchCardQtd) return state.contentApp.banner_text_card_title_two;
			return state.contentApp.banner_text_card_title_five;
		},

		subtitleCardScratchQtd: (state) => {
			const storeIncentive = useStoreIncentive();
			const hasScratchCardQtd = storeIncentive.hasScratchCardQtd;

			if (hasScratchCardQtd)
				return state.contentApp.banner_text_card_subtitle_two;
			return state.contentApp.banner_text_card_subtitle_three;
		},

		linkCardScratchQtd: (state) => {
			const storeIncentive = useStoreIncentive();
			const hasScratchCardQtd = storeIncentive.hasScratchCardQtd;

			if (hasScratchCardQtd) return '/app/gamification';
			return '';
		},

		callToActionCardScratchQtd: (state) => {
			const storeIncentive = useStoreIncentive();
			const hasScratchCardQtd = storeIncentive.hasScratchCardQtd;

			if (hasScratchCardQtd)
				return state.contentApp.banner_text_card_label_button_two;
			return false;
		},

		// Próximo Sorteio
		titleCardNextDraw: (state) => {
			const storeIncentive = useStoreIncentive();
			const nextDrawDateIsBefore = storeIncentive.nextDrawDateIsBefore;

			if (nextDrawDateIsBefore)
				return state.contentApp.banner_text_card_title_six;

			return state.contentApp.banner_text_card_title_one;
		},
		subtitleCardNextDraw: (state) => {
			const storeIncentive = useStoreIncentive();
			const nextDrawDateIsBefore = storeIncentive.nextDrawDateIsBefore;

			if (nextDrawDateIsBefore)
				return state.contentApp.banner_text_card_subtitle_four;

			return state.contentApp.banner_text_card_subtitle_one;
		},
		labelButtonCardNextDraw: (state) => {
			const storeIncentive = useStoreIncentive();
			const nextDrawDateIsBefore = storeIncentive.nextDrawDateIsBefore;

			if (nextDrawDateIsBefore)
				return state.contentApp.banner_text_card_label_button_three;

			return false;
		},

		// Revelar Prêmio
		descriptionRevealDrawPrize: (state) => {
			const storeIncentive = useStoreIncentive();
			const revealChosenDrawDateYearFull =
				storeIncentive.revealChosenDrawDateYearFull;

			if (revealChosenDrawDateYearFull) {
				return `${state.contentApp.banner_text_card_description_two} ${revealChosenDrawDateYearFull}`;
			}

			return '';
		},

		// Meus Prêmios
		descriptionPrizes: (state) => {
			return (payload) => {
				if (payload === 'luckyNumber')
					return state.contentApp.sessions_subtitle_one;
				if (payload === 'ScratchCard')
					return state.contentApp.sessions_subtitle_two;
			};
		},
		imgTypePrizes: (state) => {
			const { pathAssets } = useRuntimeConfig().public;

			return (payload) => {
				if (payload === 'luckyNumber')
					return `${pathAssets}${state.contentApp.sessions_image_one}`;
				if (payload === 'ScratchCard')
					return `${pathAssets}${state.contentApp.sessions_image_two}`;
			};
		},

		// Faq
		faq: (state) => {
			if (!state.loading)
				return state.contentApp.faq_questions_list
					? state.contentApp.faq_questions_list
					: { list: [] };
			return { list: [] };
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
		async callToActionPrize() {
			const storeIncentive = useStoreIncentive();
			const revealChosenDraw =
				storeIncentive.gamification.lotteryDraws.revealChosenDraw;
			const revealDrawnNumber = storeIncentive.revealDrawnNumber;

			const router = useRouter();
			this.modalPrize.isOpenModalPrizeResult = false;

			switch (this.modalPrize.typeAction) {
				case 'reveal':
					revealChosenDraw.showDrawnNumbersToday = true;
					await revealDrawnNumber(1000);
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
	},
});
