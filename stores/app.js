const textPlaceholder = 'O Texto aparecerá aqui...'
export const useStoreApp = defineStore('storeApp', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			contentApp: {
				// Config
				config_will_have_hotsite: null,

				// Layout
				layout_background_app: null,
				layout_background_modal: null,

				// Brand
				brand_image_one: null,
				brand_image_two: null,
				brand_image_three: null,

				// Banner
				banner_background_card_one: null,
				banner_image_card_one: null,
				banner_text_card_title_one: textPlaceholder,
				banner_text_card_subtitle_one: textPlaceholder,
				banner_background_card_two: null,
				banner_image_card_two: null,
				banner_text_card_title_two: textPlaceholder,
				banner_text_card_subtitle_two: textPlaceholder,
				banner_text_card_label_button_two: textPlaceholder,

				// Colors
				colors_text_one: null,
				colors_background_one: null,
				colors_carousel_pagination_background: null,
				colors_carousel_pagination_active: null,
				colors_background_button: null,
				colors_text_button: null,

				// Modal
				modal_text_prize_title_one: textPlaceholder,
				modal_text_prize_subtitle_one: textPlaceholder,
				modal_text_prize_label_one: textPlaceholder,
			},
			contentHasBeenLoaded: false,
			modalPrize: {
				isOpenModalPrizeResult: false,
				title: textPlaceholder,
				subtitle: textPlaceholder,
				labelButton: textPlaceholder,
				typeAction: '',
			},
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
