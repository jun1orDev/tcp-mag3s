<template>
	<div :style="background"
		class="overflow-hidden bg-cover fixed top-0 right-0 left-0 bottom-0 bg-no-repeat bg-center -z-10">
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

const { pathAssets } = useRuntimeConfig().public;

const background = computed(() => {
	return `background-image: url('${pathAssets}${store.contentApp.layout_background_app_two}'), url('/imgs/img_fundo_loading.png'); background-color: ${store.contentApp.colors_background_one}`;
});
</script>

<style scoped></style>
