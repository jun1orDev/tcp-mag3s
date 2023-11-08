<template>
	<NuxtLink :to="props.linkSource" target="_blank" v-if="store.contentHasBeenLoaded"
		class="w-full relative grid grid-cols-[70px_1fr] sm:grid-cols-[85px_1fr] md:grid-cols-[100px_1fr] justify-between px-2 sm:px-4 md:px-6">
		<!-- Background -->
		<div :style="[backgroundColor, borderColor]"
			class="absolute opacity-70 -translate-y-[50%] border top-[50%] right-0 left-0 min-h-[35px] sm:h-[40px] md:h-[42px] lg:h-[60px] rounded-lg md:rounded-xl -z-10 animate__animated animate__zoomIn">
		</div>

		<!-- Lado Esquerdo -->
		<div class="flex items-center">
			<!-- Imagem de destaque -->
			<div class="w-[55px] sm:w-[65px] md:w-[80px] animate__animated animate__tada">
				<img :src="imageDT" onerror="this.src='/imgs/selo_fiel.png'" />
			</div>
		</div>

		<!-- Lado Direito -->
		<div class="justify-start items-center">

			<!-- Conteúdo de texto -->
			<div :style="`color: ${store.contentApp.colors_text_one}`" class="py-10 md:py-8 lg:py-6">

				<div class="text-start">
					<!-- Description -->
					<div class="animate__animated animate__fadeIn">
						<p class="fm1 text-[9px] leading-3 lg:leading-5 sm:text-[10px] md:text-[14px] lg:text-base text-start" v-html="props.description">
						</p>
					</div>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['linkSource', 'description', 'imageDetach']);

const backgroundColor = computed(() => {
	return `background-color: ${store.contentApp.colors_background_one}`;
});

const borderColor = computed(() => {
	return `border-color: ${store.contentApp.colors_border_one}`;
});

const imageDT = computed(() => {
	return `${pathAssets}${props.imageDetach}`;
});
</script>

<style scoped></style>
