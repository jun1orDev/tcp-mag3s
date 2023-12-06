<template>
	<div :style="background"
		class="overflow-hidden bg-cover absolute top-0 right-0 left-0 bottom-0 bg-no-repeat bg-center bg-fixed -z-10">
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

const props = defineProps(['imageMobile', 'image']);

let widthWindow = ref(null);

const background = computed(() => {
	if (widthWindow.value != null && widthWindow.value <= 912) {
		return `background-image: url('${props.imageMobile}'), url('/imgs/lp/cover_banner_mobile.png'); background-color: ${store.contentApp.colors_background_one}`;
	}

	if (widthWindow.value != null && widthWindow.value > 912) {
		return `background-image: url('${props.image}'), url('/imgs/lp/cover_banner.png'); background-color: ${store.contentApp.colors_background_one}`;
	}

	return `background-color: ${store.contentApp.colors_background_one}`;
});

onMounted(() => {
	widthWindow.value = window.innerWidth;
})
</script>

<style scoped></style>
