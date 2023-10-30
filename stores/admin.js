export const useStoreAdmin = defineStore('storeAdmin', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			login: {
				email: '',
				password: '',
			},
			logout: false,
			medias: [],
			filterMedias: [],
			tags: [],
			loading: false,
			isOpenModalMedia: false,
			formMedia: {
				name: '',
				value: '',
				valueFilesMedia: null,
				valueBoolean: [
					{
						name: 'sim',
						value: 'on',
						label: 'VERDADEIRO',
					},
					{
						name: 'não',
						value: 'null',
						label: 'FALSO',
					},
				],
				tagSelected: null,
				typeMS: null,
				typesMedia: [
					{ name: 'texto', value: 'text' },
					{ name: 'link', value: 'link' },
					{ name: 'cor', value: 'color' },
					{ name: 'arquivo/imagem', value: 'archive' },
					{ name: 'ícone', value: 'icon' },
					{ name: 'data/hora', value: 'datetime' },
					{ name: 'verdadeiro/falso', value: 'boolean' },
				],
				newTag: {
					choise: 0,
					questions: [
						{
							name: 'sim',
							value: 1,
							label: 'SIM',
						},
						{
							name: 'não',
							value: 0,
							label: 'NÃO',
						},
					],
				},
			},
		};
	},

	getters: {
		typesMediaForm: (state) => state.formMedia.typesMedia,
		typeMediaSelectedForm: (state) => state.formMedia.typeMS,
		newTag: (state) => state.formMedia.newTag,
		tagsMediaFormSelected: (state) => {
			return state.tags.slice(1);
		},
		completedForm: (state) => {
			return (
				state.formMedia.name &&
				state.formMedia.typeMS &&
				(state.formMedia.value || state.formMedia.valueFilesMedia) &&
				state.formMedia.tagSelected
			);
		},
	},

	actions: {
		async getContent(useToast) {
			const toast = useToast();

			try {
				const { data, error, status } = await useFetch('/api/admin/medias', {
					method: 'get',
					credentials: 'include',
				});

				if (status.value === 'success') {
					this.medias = data.value.data.medias.reverse();
					this.filterMedias = data.value.data.medias.reverse();
					this.tags = data.value.data.tags;
				}

				if (status.value === 'error') {
					this.tags = error.value.data.data ? error.value.data.data.tags : null;
					toast.add({
						id: 'error_getContent',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 3500,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_getContent',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
		},

		async postNewMedia(useToast) {
			const toast = useToast();
			this.loading = true;
			let formData = new FormData();

			if (this.formMedia.valueFilesMedia) {
				for (const file of this.formMedia.valueFilesMedia) {
					formData.append('value', file);
				}
			}

			const data = {
				name: this.formMedia.name,
				value: this.formMedia.value,
				tag: this.formMedia.tagSelected,
				type: this.formMedia.typeMS,
				newtag: this.formMedia.newTag.choise,
			};

			for (const item in data) {
				formData.append(item, data[item]);
			}

			try {
				const { data, error, status } = await useFetch('/api/admin/medias', {
					method: 'post',
					body: formData,
					credentials: 'include',
				});

				if (status.value === 'success') {
					this.medias.unshift(data.value.data.media);
					this.filterMedias = this.medias;

					if (data.value.data.newTag) this.tags.push(data.value.data.newTag);

					toast.add({
						id: 'success_postNewMedia',
						title: `Tudo certo!`,
						description: `${data.value.message}`,
						color: 'green',
						icon: 'i-material-symbols-check-circle-rounded',
						timeout: 3500,
					});

					this.$resetFormMedia();
				}

				if (status.value === 'error') {
					toast.add({
						id: 'error_getContent',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 5000,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_getContent',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 5000,
				});
			}

			this.loading = false;
		},

		$resetFormMedia() {
			this.isOpenModalMedia = false;

			setTimeout(() => {
				this.formMedia.name = '';
				this.formMedia.value = '';
				this.formMedia.valueFilesMedia = null;
				this.formMedia.tagSelected = null;
				this.formMedia.typeMS = null;
				this.formMedia.newTag.choise = 0;
			}, 1000);
		},

		$resetFormMediaValue() {
			this.formMedia.value = null;
		},

		async getLoading() {
			this.loading = false;
		},

		filterPerTag(id, tagChoice) {
			this.filterMedias = null;

			this.tags.forEach((tag) => (tag.filter = false));

			this.tags.find((tag) => {
				if (tag.id === id) {
					tag.filter = !tag.filter;
				}
			});

			if (tagChoice !== 'todos') {
				this.filterMedias = this.medias.filter(
					(media) => media.tag == tagChoice
				);
				return;
			}

			this.filterMedias = this.medias;
		},
	},
});
