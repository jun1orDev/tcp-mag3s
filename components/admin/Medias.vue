<template>
	<div>
		<div class="flex items-center justify-between">
			<h2 class="mb-2 text-lg font-bold">Mídias Cadastradas:</h2>
			<h3>
				<UBadge :ui="{ rounded: 'rounded-full' }" size="xs" color="green" :label="store.totalMidias + ' Mídias'"
					class="font-bold" />
			</h3>
		</div>
		<div v-if="store.totalMidias" v-for="media in store.filterMedias" :key="media.id"
			class="relative grid grid-cols-5 border rounded-xl mb-5 last:mb-0 px-4 py-2 shadow-md hover:shadow-lg hover:border-green-500 animate__animated animate__fadeInUp" v-auto-animate>
			<div>
				<small class="text-xs text-green-500">Nome do conteúdo:</small>
				<p class="line-clamp-1">{{ media.name }}</p>
			</div>
			<div>
				<small class="text-xs text-green-500">Tag:</small>
				<p class="line-clamp-1">{{ media.tag }}</p>
			</div>
			<div>
				<small class="text-xs text-green-500">Tipo:</small>
				<p>{{ media.type }}</p>
			</div>
			<div class="flex flex-col justify-center">
				<small class="text-xs text-green-500">Valor:</small>
				<div v-if="isMedia(media.type)">
					<UButton variant="link" class="p-0 m-0" label="Abrir mídia" />
				</div>
				<div v-else-if="isList(media.type)">
					<p class="line-clamp-1" v-html="media.value.list[0].one"></p>
				</div>
				<p v-else class="line-clamp-1" v-html="media.value"></p>
			</div>
			<div>
				<small class="block text-md text-red-500">Ações:</small>
				<UButton color="red" icon="i-material-symbols-delete-forever-outline" variant="soft" size="sm" class="me-2"
					label="excluir" @click="store.openModalMediaDelete(media)" />
				<UButton color="sky" icon="i-material-symbols-edit-outline" variant="soft" size="sm" class="me-2" label="editar"
					@click="store.openModalMediaEdit(media.id)" />
				<UTooltip v-if="media.description" class="cursor-pointer" :text="media.description"
					:popper="{ placement: 'bottom' }">
					<UIcon class="text-2xl" name="i-material-symbols-contact-support-outline"
						@click="openModalDescription({ title: media.name, description: media.description })" />
				</UTooltip>
			</div>
			<div class="absolute right-0 top-0 rounded-e-xl w-[10px] h-full" :class="setTypesMediaStyle(media.type)"></div>
			<div v-if="media.value === null || media.value === undefined"
				class="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-red-600 animate-ping"></div>
		</div>

		<div v-else class="flex flex-col items-center justify-center animate__animated animate__tada">
			<UIcon name="i-material-symbols-sad-tab-rounded" class="w-20 h-20 text-red-500 opacity-95" />
				<div class="text-xl text-gray-500">
					<p>nenhuma mídia encontrada!</p>
				</div>
		</div>

		<!-- Modal para descrição da mídia -->
		<UModal v-model="isOpenModalDescription">
			<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
							{{ detailsModal.title }}
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="closeModalDescption" />
					</div>
				</template>

				<div>
					{{ detailsModal.description }}
				</div>

				<Placeholder class="h-32" />
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';

const store = useStoreAdmin();
const { typesMedia } = useRuntimeConfig().public;

let isOpenModalDescription = ref(false);

let detailsModal = ref({
	title: '',
	description: '',
});

function openModalDescription(description) {
	isOpenModalDescription.value = true;
	detailsModal.value = description;
}

function closeModalDescption() {
	isOpenModalDescription.value = false;
	detailsModal.value = {
		title: '',
		description: '',
	};
}

const setTypesMediaStyle = (type) => {
	switch (type) {

		case typesMedia[0]:
			return 'bg-red-300'
		case typesMedia[1]:
			return 'bg-blue-300'
		case typesMedia[2]:
			return 'bg-violet-300'
		case typesMedia[3]:
			return 'bg-teal-300'
		case typesMedia[4]:
			return 'bg-pink-300'
		case typesMedia[5]:
			return 'bg-amber-300'
		case typesMedia[6]:
			return 'bg-slate-300'
		case typesMedia[7]:
			return 'bg-lime-300'

		default:
			break;
	}
}

const isMedia = (type) => {
	return type === typesMedia[3]
}

const isList = (type) => {
	return type === typesMedia[7]
}
</script>

<style lang="css" scoped></style>
