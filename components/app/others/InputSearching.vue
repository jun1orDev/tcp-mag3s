<template>
	<div class="flex relative items-center">
		<UIcon name="i-material-symbols-search-rounded" class="absolute top-1/2 transform -translate-y-1/2 left-2 w-6 h-6"
			:style="[iconColorSearch, 'pointer-events: none']" />

		<input v-model="store.searchingValue" type="text"
			class="pl-10 pr-4 w-full h-8 md:h-12 rounded-md border-2 bg-transparent" v-maska :data-maska="props.hasMaskInput"
			:style="[
				colorTextSearch,
				colorBorderSearch,
				'outline: none;',
				backgroundColor,
			]" :placeholder="props.inputPlaceholder" :inputmode="inputModeOption" />
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const props = defineProps(['inputPlaceholder','hasMaskInput', 'inputModeOption']);

const colorTextSearch = computed(() => {
	return `color: ${store.contentApp.colors_text_one}`;
});

const backgroundColor = computed(() => {
	return `background-color: ${store.contentApp.colors_background_one}`;
});

const colorBorderSearch = computed(() => {
	return `border-color: ${store.contentApp.colors_border_one}`;
});

const iconColorSearch = computed(() => {
	return `color: ${store.contentApp.colors_border_one}`;
});

onNuxtReady(() => {
	store.searchingValue = '';
})
</script>

<style scoped></style>
