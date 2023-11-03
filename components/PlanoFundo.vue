<template>
	<div :style="backgroundApp"
		class="overflow-hidden bg-cover fixed bg-black top-0 right-0 left-0 bottom-0 bg-no-repeat bg-center -z-10">
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

const { pathAssets } = useRuntimeConfig().public;

const backgroundApp = computed(() => {
	return `background-image:url('${pathAssets}${store.contentApp.layout_background_app}'), url('/imgs/img_fundo_loading.png')`;
});
</script>

<style scoped></style>
