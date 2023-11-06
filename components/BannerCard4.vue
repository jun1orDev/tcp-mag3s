<template>
	<NuxtLink :to="props.linkSource" v-if="store.contentHasBeenLoaded"
		class="w-full relative p-3 sm:p-6 md:p-6 min-h-[210px] sm:h-[250px] md:h-[280px] ">
		<!-- Background -->
		<div :style="background"
			class="absolute top-0 bottom-0 right-0 left-0 bg-no-repeat bg-center bg-cover rounded-lg md:rounded-3xl -z-10 animate__animated animate__fadeIn">
		</div>

		<!-- Conteúdo -->
		<div :style="`color: ${store.contentApp.colors_text_one}`" class="flex flex-col h-full justify-between items-center">

			<!-- Título -->
			<h1 class="fm3 text-[12px] sm:text-[18px] md:text-[20px] lg:text-[14px] uppercase animate__animated animate__fadeInDown">
				{{ props.title }}
			</h1>

			<!-- items -->
			<Carousel id="carousel-card" class="w-full flex flex-col justify-between" :autoplay="carouselAutoPlay" :wrap-around="true"
				:pause-autoplay-on-hover="true">
				<Slide v-for="slide in props.awards" :key="slide" class="flex flex-col">

					<!-- Image -->
					<div class="w-[100px] sm:w-[120px] md:w-[140px] animate__animated animate__tada">
						<img v-if="slide.image" :src="slide.image" />
						<img v-else src="/imgs/premio_02.png" />
					</div>

					<!-- Data -->
					<div v-if="props.awards.length > 1" class="fm3 mt-1 text-[12px] sm:text-[16px]">
						<h1 v-if="!slide.date" class="animate__animated animate__fadeIn">{{ $formatDayMonthYear('2023-11-15T00:00:00+0000') }}</h1>
						<Spin v-else class="mt-3 animate__animated animate__zoomIn" />
					</div>
				</Slide>
				<template #addons>
					<Pagination v-if="props.awards.length > 1" />
				</template>
			</Carousel>


			<!-- Call to action -->
			<div v-if="props.callToAction"
				class="fm3 w-full flex items-center justify-end mt-4 text-[10px] sm:text-[12px] md:text-[14px] uppercase tracking-wider">
				<p> {{ props.callToAction }} </p>
				<UIcon v-if="props.callToAction" class="arrow ms-1 text-lg" name="i-material-symbols-arrow-forward-ios" />
			</div>

		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['linkSource', 'background', 'title', 'callToAction', 'awards', 'carouselAutoPlay']);

const background = computed(() => {
	return `background-image:url('${pathAssets}${props.background}'), url('/imgs/card_sorteio_futuro_mobile.png')`;
});

const colorBgButton = computed(() => {
	return store.contentApp.colors_background_button;
});

const bgCarouselPagination = computed(() => {
	return store.contentApp.colors_carousel_pagination_background;
})

const bgCarouselPaginationActive = computed(() => {
	return store.contentApp.colors_carousel_pagination_active;
})

</script>

<style>
.arrow {
	background-color: v-bind(colorBgButton);
}

#carousel-card .carousel__pagination-button::after {
	/* Your custom styles here */
	width: 20px;
	border-radius: 15px;
	height: 4px;
	background-color: v-bind(bgCarouselPagination);
	opacity: .3;
}

#carousel-card .carousel__pagination-button--active::after {
	/* Your custom styles here */
	background-color: v-bind(bgCarouselPaginationActive);
	opacity: 1;
}
</style>
