<template>
	<div>
		<UModal v-model="store.isOpenModalMedia" :fullscreen="false"
			:ui="{ width: 'sm:max-w-5xl', heigth: 'sm-min-w-full', padding: 'sm:mx-8' }">
			<UCard :ui="options">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-xl leading-6 text-green-700 dark:text-white uppercase font-semibold">
							Cadastre uma nova Mídia
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="store.isOpenModalMedia = false" />
					</div>
				</template>

				<!-- Content -->
				<div>

					<!-- Linha 1 do formulário -->
					<div class="grid grid-cols-3 gap-4 mb-8">

						<!-- Nome  -->
						<div>
							<label class="block mb-2" for="name">Nome do conteúdo:</label>
							<UInput id="name" type="text" placeholder="Digite aqui..." :trailing="false"
								icon="i-material-symbols-media-link-outline-sharp" size="xl" v-model="store.formMedia.name" />
						</div>

						<!-- Tipo -->
						<div>
							<label class="block mb-2" for="name">Escolha o tipo de mídia:</label>
							<USelectMenu v-model="store.formMedia.typeMS" option-attribute="name" :options="store.typesMediaForm"
								value-attribute="value" placeholder="selecione aqui..." :trailing="false"
								icon="i-material-symbols-tamper-detection-on-sharp" size="xl" @change="store.$resetFormMediaValue" />
						</div>

						<!-- Seleção do Tipo de mídia -->
						<div>
							<!-- Texto -->
							<div v-if="store.typeMediaSelectedForm === 'text'">
								<label class="block mb-2" for="value">Insira o texto:</label>
								<UTextarea id="value" type="text" placeholder="Digite aqui..." size="xl"
									v-model="store.formMedia.value" />
							</div>

							<!-- Link -->
							<div v-if="store.typeMediaSelectedForm === 'link'">
								<label class="block mb-2" for="value">Insira o link:</label>
								<UInput id="value" type="link" placeholder="Digite aqui..." size="xl" v-model="store.formMedia.value" />
							</div>

							<!-- Cor -->
							<div v-if="store.typeMediaSelectedForm === 'color'">
								<label class="block mb-2" for="value">Insira a cor:</label>
								<UInput id="value" type="color" placeholder="Escolha a cor..." size="xl" v-model="store.formMedia.value"
									:ui="{ base: 'h-[44px] max-w-[100px]' }" />
							</div>

							<!-- Imagem/Arquivo -->
							<div v-if="store.typeMediaSelectedForm === 'archive'">
								<label class="block mb-2" for="fileMedia">Insira a mídia:</label>
								<UInput id="fileMedia" type="file" multiple size="xl" v-on:change="handleFileUpload" />
							</div>

							<!-- Data e Hora -->
							<div v-if="store.typeMediaSelectedForm === 'datetime'">
								<label class="block mb-2" for="value">Insira a cor:</label>
								<UInput id="value" type="datetime-local" placeholder="Escolha a data" size="xl"
									v-model="store.formMedia.value" />
							</div>

							<!-- Verdadeiro/Falso -->
							<div v-if="store.typeMediaSelectedForm === 'boolean'">
								<label class="block mb-2" for="value">Escolha apenas 1 opção:</label>
								<URadio v-for="boolean of store.formMedia.valueBoolean" id="value" name="value" :key="boolean.name"
									v-model="store.formMedia.value" v-bind="boolean" />
							</div>

							<!-- Sem escolha -->
							<div v-if="store.typeMediaSelectedForm === null"
								class="flex flex-col items-center h-full w-full justify-end text-center text-red-500 font-medium">
								<UIcon class="text-5xl" name="i-material-symbols-deployed-code-outline-sharp" />
								<h3>O tipo de mídia selecionada<br /> aparecerá aqui!</h3>
							</div>
						</div>
					</div>

					<!-- Linha 2 do formulário -->
					<div class="grid grid-cols-4 gap-4">

						<!-- è uma tag nova? -->
						<div>
							<label class="block mb-2" for="name">Criar um nova Tag?</label>
							<URadio v-for="question of store.newTag.questions" :key="question.name" v-model="store.newTag.choise"
								v-bind="question" />
						</div>

						<!-- Tag / escolha da tag -->
						<div class="col-span-3">
							<div v-if="store.newTag.choise">
								<label class="block mb-2" for="tag">Nome da Tag:</label>
								<UInput id="tag" type="text" placeholder="Digite aqui..." :trailing="false"
									icon="i-material-symbols-new-label-sharp" v-model="store.formMedia.tagSelected" size="xl" />
							</div>

							<div v-else>
								<label class="block mb-2" for="name">Qual a Tag para essa Mídia?</label>
								<USelectMenu v-model="store.formMedia.tagSelected" option-attribute="name" :options="store.tags"
									value-attribute="name" placeholder="selecione aqui..." :trailing="false"
									icon="i-material-symbols-label-sharp" size="xl" />
							</div>
						</div>
					</div>
				</div>

				<template #footer>
					<!-- Content -->
					<div class="w-full grid grid-cols-5 text-center text-[60px]">
						<div>
							<UIcon v-if="store.formMedia.name" class="text-green-300"
								name="i-material-symbols-media-link-outline-sharp" />
							<UTooltip v-else text="Faltou preencher o Nome de conteúdo">
								<UIcon class="text-gray-300" name="i-material-symbols-media-link-outline-sharp" />
							</UTooltip>
						</div>
						<div>
							<UIcon v-if="store.typeMediaSelectedForm" class="text-green-300"
								name="i-material-symbols-tamper-detection-on-sharp" />
							<UTooltip v-else text="Faltou preencher o Tipo de mídia">
								<UIcon class="text-gray-300" name="i-material-symbols-tamper-detection-off-outline-sharp" />
							</UTooltip>
						</div>
						<div>
							<UIcon v-if="store.formMedia.value || store.formMedia.valueFilesMedia" class="text-green-300"
								name="i-material-symbols-deployed-code-outline-sharp" />
							<UTooltip v-else text="Faltou preencher a Mídia">
								<UIcon class="text-gray-300" name="i-material-symbols-deployed-code-outline-sharp" />
							</UTooltip>
						</div>
						<div>
							<UIcon v-if="store.formMedia.tagSelected" class="text-green-300" name="i-material-symbols-label-sharp" />
							<UTooltip v-else text="Faltou preencher a Tag">
								<UIcon class="text-gray-300" name="i-material-symbols-label-sharp" />
							</UTooltip>
						</div>

						<div class="flex items-center justify-center">
							<UButton :loading="store.loading" label="Salvar" size="xl" :color="store.completedForm ? 'green' : 'gray'"
								variant="outline" :disabled="!store.completedForm" @click="store.postNewMedia(useToast)" />
						</div>
					</div>
				</template>
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const store = useStoreAdmin();

const options = ref({
	base: 'h-full flex flex-col',
	rounded: '',
	divide: 'divide-y divide-gray-100 dark:divide-gray-800',
	body: {
		base: 'grow'
	}
});

const handleFileUpload = (event) => {
	store.formMedia.valueFilesMedia = event.target.files || event.dataTransfer.files;
}

</script>

<style lang="css" scoped></style>
