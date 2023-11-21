<template>
	<NuxtLink :to="props.link" :style="[borderColor, props.hasBgGradient ? backgroundColorGradient : backgroundColor]" class="relative w-full flex justify-between border rounded-xl">
		<div :style="textColor" class="flex items-center">
			<!-- imagem -->
			<div class="mx-5">
				<img :src="props.imagemSrc" class="scale-150 top-0 left-0 object-cover w-[98px]" />
			</div>

			<!-- Data -->
			<div v-if="props.date" class="text-center me-5">
				<p class="fm3 text-[26px] text-md-[30px] leading-5 md:leading-6">{{props.date.day}}</p>
				<p class="uppercase text-base">{{props.date.month}}</p>
			</div>

			<!-- Image -->
			<div v-else class="items-center justify-center">
				<img :src="props.imgCard" onerror="this.src='/imgs/trevo.png'" class="mr-4">
			</div>

			<!-- Titulo e subtítulo -->
			<div>
				<div>
					<p class="fm3 text-xs md:text-sm leading-3 md:leading-normal uppercase">
						<span>{{ props.titulo }}</span>
					</p>
					<p class="fm1 text-[10px] md:text-sm leading-3 md:leading-normal ">
						<span>{{ props.subtitulo }}</span>
					</p>
				</div>
			</div>
		</div>

		<!-- Botão -->
		<div class="flex items-center text-xl md:text-3xl rounded-e-xl" :style="[backgroundColorButton, textColorButton]">
			<UIcon class="mx-1" name="i-material-symbols-arrow-forward-ios" />
		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

const props = defineProps(['titulo', 'subtitulo', 'imagemSrc', 'link', 'hasBgGradient', 'date', 'imgCard']);

const textColor = computed(() => {
	return `color: ${store.contentApp.colors_text_one}`;
});

const borderColor = computed(() => {
	return `border-color: ${store.contentApp.colors_border_one}`;
});

const backgroundColor = computed(() => {
	return `background-color: ${store.contentApp.colors_background_one}`;
});

const backgroundColorGradient = computed(() => {
	return `background: linear-gradient(90deg, ${store.contentApp.colors_background_three} -16%, ${store.contentApp.colors_background_one}9A 75%);`;
});

// Botão
const textColorButton = computed(() => {
	return `color: ${store.contentApp.colors_text_button}`;
});

const backgroundColorButton = computed(() => {
	return `background-color: ${store.contentApp.colors_background_button}`;
});
</script>

<style scoped></style>
