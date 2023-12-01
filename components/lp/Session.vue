<template >
	<div class="relative">

		<LpBgDefault :image="props.bgImage" :imageMobile="props.bgImageMobile" />
		<UContainer :style="colorText" class="py-12">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center md:text-start">
				<div :class="['order-1', orderText]">
					<h3 class="fm3 text-3xl md:text-4xl lg:text-5xl mb-5">{{ props.title }}</h3>
					<p class="text-xl lg:text-3xl lg:leading-10">{{ props.description }}</p>
				</div>
				<div :class="['order-0', orderImage]">
					<Carousel id="carousel-next-prizes" :autoplay="0" :wrap-around="false" :pause-autoplay-on-hover="true">
						<Slide v-for="slide in 1" :key="slide">
							<img class="" :src="props.image" onerror="this.src='/imgs/lp/session_placeholder.png'" alt="">
						</Slide>
					</Carousel>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const props = defineProps(['title', 'description', 'image', 'bgImage', 'bgImageMobile', 'positionText', 'positionImage']);

const labelButton = ref('Quero participar');

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button}`;
});

const orderText = computed(() => {
	if (props.positionText === 'left') {
		return `md:order-0`
	}

	if (props.positionText === 'right') {
		return `md:order-1`
	}
});

const orderImage = computed(() => {
	if (props.positionImage === 'left') {
		return `md:order-0`
	}

	if (props.positionImage === 'right') {
		return `md:order-1`
	}
});

const colorText = computed(() => {
	return `color: ${app.colors_text_one};`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button}`;
});
</script>

<style scoped></style>
