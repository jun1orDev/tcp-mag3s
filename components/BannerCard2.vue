<template>
	<NuxtLink :to="props.linkSource" v-if="store.contentHasBeenLoaded"
		class="w-full relative grid grid-cols-[165px_1fr] sm:grid-cols-[260px_1fr] justify-start items-end">
		<!-- Background -->
		<div :style="background"
			class="absolute bottom-0 right-0 left-0 min-h-[120px] sm:h-[160px] md:h-[180px] bg-no-repeat bg-right md:bg-center bg-cover rounded-lg md:rounded-3xl -z-10 animate__animated animate__fadeIn">
		</div>

		<!-- Lado Esquerdo -->
		<div class="w-[165px] sm:w-[260px] me-5">
			<!-- Imagem de destaque -->
			<img class="w-full" :src="imageDT" onerror="this.src='/imgs/gol.png'" />
		</div>

		<!-- Lado Direito -->
		<div class="flex flex-col items-end justify-center h-full" :style="`color: ${store.contentApp.colors_text_one}`">

			<!-- Quantidade de raspadinhas -->
			<div class="flex justify-end w-full me-5 animate__animated animate__fadeIn">
				<div class="flex flex-col items-end">
					<div class="flex">
						<p class="text-[14px] md:text-[24px] me-1">03</p>
						<img src="/imgs/image_rasp.png" class="w-[35px] md:w-[64px]" />
					</div>
					<div>
						<p class="rabiscadinha uppercase text-[7px] md:text-[12px]">rabiscadinhas</p>
					</div>
				</div>
			</div>

			<!-- Conteúdo de texto -->
			<div class="flex justify-center w-full mt-2" :class="'justify-center'">

				<div class="text-start">
					<!-- Título -->
					<h1 class="fm3 text-[12px] sm:text-[18px] md:text-2xl uppercase animate__animated animate__fadeInDown">
						{{ props.title }}
					</h1>

					<!-- Subtítulo -->
					<p
						class="fm1 text-[10px] sm:text-[16px] md:text-xl leading-[0.8rem] sm:leading-5 animate__animated animate__fadeInUp">
						{{ props.subtitle }}
					</p>
				</div>
			</div>

			<!-- Call to action -->
			<div v-if="props.callToAction"
				class="fm3 flex justify-end items-center text-[10px] mt-2 me-3 sm:text-[12px] md:text-[14px] uppercase tracking-wider w-full">
				<p> {{ props.callToAction }} </p>
				<UIcon v-if="props.callToAction" class="arrow ms-1 text-lg md:text-2xl" name="i-material-symbols-arrow-forward-ios" />
			</div>
		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['linkSource', 'title', 'subtitle', 'qtdScratchCard', 'callToAction', 'imageDetach']);

const background = computed(() => {
	return `background-image:url('${pathAssets}${store.contentApp.banner_background_card_two}'), url('/imgs/fundo_card_2.png')`;
});

const imageDT = computed(() => {
	return `${pathAssets}${props.imageDetach}`;
});

const colorBgButton = computed(() => {
	return store.contentApp.colors_background_button;
});

</script>

<style scoped>
.arrow {
	background-color: v-bind(colorBgButton);
}
</style>
