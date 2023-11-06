<template>
	<NuxtLink :to="props.linkSource" v-if="store.contentHasBeenLoaded"
		class="w-full relative grid grid-flow-col auto-cols-auto justify-between px-4 sm:px-6 md:px-8">
		<!-- Background -->
		<div :style="backgroundColor"
			class="absolute opacity-70 -translate-y-[50%] top-[50%] right-0 left-0 min-h-[45px] sm:h-[60px] md:h-[70px] rounded-lg md:rounded-2xl -z-10 animate__animated animate__zoomIn">
		</div>

		<!-- Lado Esquerdo -->
		<div class="justify-start items-center col-span-2 me-4">

			<!-- Conteúdo de texto -->
			<div :style="`color: ${store.contentApp.colors_text_one}`" class="py-6 sm:py-12 md:py-14">

				<div class="text-start max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-max">
					<!-- Description -->
					<div class="animate__animated animate__fadeIn">
						<p class="fm1 text-[11px] leading-3 sm:text-[14px] sm:leading-4 text-start" v-html="props.description">
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Lado Direito -->
		<div class="flex items-center col-span-1">
			<!-- Imagem de destaque -->
			<div class="w-[80px] sm:w-[120px] md:w-[140px] animate__animated animate__tada">
				<img :src="imageDT" onerror="this.src='/img/thumb_premios1.png'" />
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
	return `background-color: ${store.contentApp.colors_background_two}`;
});

const imageDT = computed(() => {
	return `${pathAssets}${props.imageDetach}`;
});
</script>

<style scoped></style>
