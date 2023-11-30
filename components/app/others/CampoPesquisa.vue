<template>
	<div class="flex relative items-center">
		<UIcon
			name="i-material-symbols-search-rounded"
			class="absolute top-1/2 transform -translate-y-1/2 left-3"
			:style="[iconColorSearch, 'pointer-events: none']"
		/>

		<input
			type="text"
			class="pl-10 pr-4 w-full h-8 rounded-md border-2 bg-transparent"
			:style="[
				colorTextSearch,
				colorBorderSearch,
				'outline: none;',
				backgroundColor,
			]"
			:placeholder="inputPlaceholder"
		/>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const props = defineProps(['inputPlaceholder']);

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
</script>

<style scoped></style>
