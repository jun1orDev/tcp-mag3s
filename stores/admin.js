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
			isEditMediaModal: false,
			titleModalMedia: '',
			isOpenModalMediaDelete: false,
			chosenMediaDelete: {
				id: null,
				name: '',
			},
			listArchiveMedia: [],
			listArchiveMediaDelete: [],
			formMedia: {
				id: null,
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
				(state.formMedia.name &&
					state.formMedia.typeMS &&
					(state.formMedia.value || state.formMedia.valueFilesMedia) &&
					state.formMedia.tagSelected) ||
				state.listArchiveMedia.length
			);
		},
		editMediaValueArchive: (state) => {
			return (
				state.isEditMediaModal &&
				state.formMedia.typeMS &&
				state.listArchiveMedia.length
			);
		},
		carouselListMaxMedia: (state) => {
			return state.listArchiveMedia.length > 5
				? 5
				: state.listArchiveMedia.length;
		},
		carouselEnableLoop: (state) => {
			return state.listArchiveMedia.length > 1 ? true : false;
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
						id: 'error_postNewMedia',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 5000,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_postNewMediaAPI',
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
			this.titleModalMedia = '';

			this.formMedia.id = null;
			this.formMedia.name = '';
			this.formMedia.value = '';
			this.listArchiveMedia = [];
			this.listArchiveMediaDelete = [];
			this.formMedia.valueFilesMedia = null;
			this.formMedia.tagSelected = null;
			this.formMedia.typeMS = null;
			this.formMedia.newTag.choise = 0;

			this.isEditMediaModal = false;
		},

		$resetFormMediaValue() {
			if (this.listArchiveMedia) {
				this.selectAllArchiveMediaDelete();
			} else {
				this.listArchiveMediaDelete = [];
			}

			this.formMedia.value = null;
			this.listArchiveMedia = [];
		},

		$resetChosenMediaDelete() {
			this.isOpenModalMediaDelete = false;

			setTimeout(() => {
				this.chosenMediaDelete.id = null;
				this.chosenMediaDelete.name = '';
			}, 1000);
		},

		openModalMediaNew() {
			this.isOpenModalMedia = true;
			this.titleModalMedia = 'Cadastre uma nova Mídia';
		},

		openModalMediaDelete(media) {
			this.isOpenModalMediaDelete = true;

			this.chosenMediaDelete.id = media.id;
			this.chosenMediaDelete.name = media.name;
		},

		async deleteChosenMedia() {
			const toast = useToast();
			this.loading = true;

			try {
				const { data, error, status } = await useFetch('/api/admin/medias', {
					method: 'delete',
					body: {
						idMedia: this.chosenMediaDelete.id,
					},
					credentials: 'include',
				});

				if (status.value === 'success') {
					this.medias = data.value.data.medias.reverse();
					this.filterMedias = data.value.data.medias.reverse();

					toast.add({
						id: 'success_deleteMedia',
						title: `Tudo certo!`,
						description: `${data.value.message}`,
						color: 'green',
						icon: 'i-material-symbols-check-circle-rounded',
						timeout: 3500,
					});

					this.$resetChosenMediaDelete();
				}

				if (status.value === 'error') {
					toast.add({
						id: 'error_delteMedia',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 5000,
					});

					if (error.value.data.data.isDelete) {
						this.medias = error.value.data.data.medias.reverse();
						this.filterMedias = error.value.data.data.medias.reverse();

						this.$resetChosenMediaDelete();
						this.getContent();
					}
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

		openModalMediaEdit(id) {
			const media = this.filterMedias.find((media) => media.id === id);

			this.isOpenModalMedia = true;
			this.titleModalMedia = `Edite a mídia ${media.name}`;
			this.isEditMediaModal = true;

			this.formMedia.id = media.id;
			this.formMedia.name = media.name.replace(/_/g, ' ');
			this.formMedia.typeMS = media.type;
			this.formMedia.tagSelected = media.tag;

			if (this.formMedia.typeMS === 'archive') {
				this.formMedia.value = null;
				this.listArchiveMedia = media.value;
			} else {
				this.formMedia.value = media.value;
			}
		},

		async putEditMedia(useToast) {
			const toast = useToast();
			this.loading = true;
			let formData = new FormData();

			if (this.formMedia.valueFilesMedia) {
				for (const file of this.formMedia.valueFilesMedia) {
					formData.append('value', file);
				}
			}

			const data = {
				id: this.formMedia.id,
				name: this.formMedia.name,
				tag: this.formMedia.tagSelected,
				type: this.formMedia.typeMS,
				newtag: this.formMedia.newTag.choise,
			};

			if (this.listArchiveMediaDelete.length) {
				data.value_list_delete = this.listArchiveMediaDelete.join(';');
			}

			if (this.formMedia.value) {
				data.value = this.formMedia.value;
			}

			for (const item in data) {
				formData.append(item, data[item]);
			}

			try {
				const { data, error, status } = await useFetch('/api/admin/medias', {
					method: 'put',
					body: formData,
					credentials: 'include',
				});

				if (status.value === 'success') {
					this.medias = this.medias.filter(
						(item) => item.id !== data.value.data.media.id
					);

					this.medias.unshift(data.value.data.media);
					this.filterMedias = this.medias;

					if (data.value.data.newTag) this.tags.push(data.value.data.newTag);

					toast.add({
						id: 'success_putEditMedia',
						title: `Tudo certo!`,
						description: `${data.value.message}`,
						color: 'sky',
						icon: 'i-material-symbols-check-circle-rounded',
						timeout: 3500,
					});

					this.$resetFormMedia();
				}

				if (status.value === 'error') {
					toast.add({
						id: 'error_putEditMedia',
						title: `Erro: ${error.value.data.statusCode}`,
						description: `${error.value.data.message}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 5000,
					});
				}
			} catch (error) {
				toast.add({
					id: 'error_putEditMediaAPI',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 5000,
				});
			}

			this.loading = false;
		},

		selectArchiveMediaDelete(archive) {
			this.listArchiveMediaDelete.push(
				this.listArchiveMedia.find((item) => item === archive)
			);
			this.listArchiveMedia = this.listArchiveMedia.filter(
				(item) => item !== archive
			);
		},

		selectAllArchiveMediaDelete() {
			this.listArchiveMedia.forEach((item) => {
				this.listArchiveMediaDelete.push(item);
			});
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
