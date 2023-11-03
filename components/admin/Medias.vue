<template>
	<div v-for="media in store.filterMedias" :key="media.id"
		class="relative grid grid-cols-5 border rounded-xl mb-5 last:mb-0 px-4 py-2 shadow-md hover:shadow-lg hover:border-green-500 transition-shadow ease-in-out duration-500">
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
			<p v-else class="line-clamp-1" v-html="media.value"></p>
		</div>
		<div>
			<small class="block text-md text-red-500">Ações:</small>
			<UButton color="red" icon="i-material-symbols-delete-forever-outline" variant="soft" size="sm" class="me-2" label="excluir" @click="store.openModalMediaDelete(media)" />
			<UButton color="sky" icon="i-material-symbols-edit-outline" variant="soft" size="sm" class="me-2" label="editar" @click="store.openModalMediaEdit(media.id)" />
		</div>
		<div class="absolute right-0 top-0 rounded-e-xl w-[10px] h-full" :class="setTypesMediaStyle(media.type)"></div>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';

const store = useStoreAdmin();
const { typesMedia } = useRuntimeConfig().public;

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

		default:
			break;
	}
}

const isMedia = (type) => {
	return type === typesMedia[3]
}
</script>

<style lang="css" scoped></style>
