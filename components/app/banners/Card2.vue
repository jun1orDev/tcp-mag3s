<template>
	<NuxtLink :to="props.linkSource"
		class="w-full relative grid grid-cols-[165px_1fr] sm:grid-cols-[285px_1fr] lg:grid-cols-[260px_1fr] lg:max-h-[200px] justify-start items-end">
		<!-- Background -->
		<div :style="background"
			class="absolute bottom-0 right-0 left-0 min-h-[120px] sm:h-[200px] md:h-[230px] lg:h-[180px] bg-no-repeat bg-right md:bg-center bg-cover rounded-lg md:rounded-3xl -z-10 animate__animated animate__fadeIn">
		</div>

		<!-- Lado Esquerdo -->
		<div class="w-[165px] sm:w-[285px] lg:w-[250px] me-5 sm:me-2 md:me-0">
			<!-- Imagem de destaque -->
			<img class="w-full " :src="imageDT" onerror="this.src='/imgs/gol.png'" />
		</div>

		<!-- Lado Direito -->
		<div class="flex flex-col items-end justify-center sm:justify-between sm:py-7 lg:py-4 h-full"
			:style="textColor">

			<!-- Quantidade de raspadinhas -->
			<div class="flex justify-end w-full me-3 sm:me-5 animate__animated animate__fadeIn">
				<div class="flex flex-col items-end">
					<div class="flex">
						<p class="fm1 text-[14px] sm:text-[18px] md:text-[24px] lg:text-[18px] me-1" :class="!props.hasQtdDescriptionFigure ? 'detach' : ''">{{ props.qtdDescriptionFigure }}
						</p>
						<img :src="imageSC" onerror="this.src='/imgs/image_rasp.png'"
							class="w-[35px] sm:w-[45px] md:w-[64px] lg:w-[50px]" />
					</div>
					<div>
						<p class="fm1 rabiscadinha uppercase text-[7px] sm:text-[10px] md:text-[12px] lg:text-[9px]">{{
							store.contentApp.banner_text_card_scratchcard_two }}</p>
					</div>
				</div>
			</div>

			<!-- Conteúdo de texto -->
			<div class="flex justify-center w-full ps-3 md:ps-6 mt-2 lg:mt-0" :class="'justify-center'">

				<div class="text-start me-4 sm:me-0 lg:me-3">
					<!-- Título -->
					<h1
						class="fm3 text-[10px] sm:text-[18px] md:text-xl lg:text-[16px] uppercase animate__animated animate__fadeInDown" v-html="props.title">
					</h1>

					<!-- Subtítulo -->
					<p
						class="fm2 text-[9px] sm:text-[16px] md:text-lg lg:text-base leading-[0.8rem] sm:leading-5 animate__animated animate__fadeInUp" v-html="props.subtitle">
					</p>
				</div>
			</div>

			<!-- Call to action -->
			<div class="fm3 flex justify-end items-center text-[10px] sm:text-[12px] md:text-[14px] pt-2 md:pt-4 lg:pt-0 me-2 sm:me-4 uppercase tracking-wider w-full">
				<p> {{ props.callToAction || '' }} </p>
				<UIcon v-if="props.callToAction" class="arrow ms-1 text-lg md:text-2xl" name="i-material-symbols-arrow-forward-ios" />
			</div>
		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['linkSource', 'title', 'subtitle', 'hasQtdDescriptionFigure', 'qtdDescriptionFigure', 'callToAction', 'imageDetach']);

const textColor = computed(() => {
	return `color: ${store.contentApp.colors_text_banner_cards}`;
});

const background = computed(() => {
	return `background-image:url('${pathAssets}${store.contentApp.banner_background_card_two}'), url('/imgs/fundo_card_2.png')`;
});

const imageDT = computed(() => {
	return `${pathAssets}${props.imageDetach}`;
});

const imageSC = computed(() => {
	return `${pathAssets}${store.contentApp.banner_image_card_scratchcard_two}`;
});

const colorBgButton = computed(() => {
	return store.contentApp.colors_background_button;
});

const colorDetach = computed(() => {
	return store.contentApp.colors_detach_one;
});

</script>

<style scoped>
.arrow {
	background-color: v-bind(colorBgButton);
}
.detach {
	color: v-bind(colorDetach);
}
</style>
