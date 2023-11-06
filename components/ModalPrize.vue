<template>
	<UModal v-model="store.modalPrize.isOpenModalPrizeResult" :fullscreen="false" prevent-close :ui="optionsModal">
		<!-- Content -->
		<div :style="[background, colorText]" class="bg-no-repeat bg-cover bg-center px-6 py-12 text-center">
			<!-- Titulo -->
			<h1 class="fm3 uppercase text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px]">{{ store.modalPrize.title }}</h1>

			<!-- Descrição -->
			<p
				class="fm2 mt-5 w-5/6 md:w-1/2 lg:w-1/2 m-auto text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-5">
				{{ store.modalPrize.subtitle }}</p>

			<!-- CallToAction -->
			<UButton :label="store.modalPrize.labelButton" class="fm3 mt-5 px-10 py-3 uppercase" :style="[colorBgButton]"
				@click="store.callToActionPrize" :ui="optionsButton" />
		</div>
	</UModal>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['typeAction'])

const background = computed(() => {
	return `background-image: url('${pathAssets}${store.contentApp.layout_background_modal}'), url('/imgs/fundo_modal_placeholder.png'); background-color: ${store.contentApp.colors_background_one}`;
});

const colorText = computed(() => {
	return `color: ${store.contentApp.colors_text_one}`
});

const colorBgButton = computed(() => {
	return `background-color: ${store.contentApp.colors_background_button}`;
});

const optionsModal = ref({
	width: 'sm:max-w-6xl',
	container: 'sm:items-end',
	heigth: 'sm-min-w-full',
	padding: 'p-0',
	margin: 'my-0 sm:my-0',
	overlay: { background: 'bg-black/90' },
	base: 'bg-black rounded-none'
});

const optionsButton = ref({});
</script>

<style scoped></style>
