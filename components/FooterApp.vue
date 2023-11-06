<template>
	<UContainer class="fm1 w-full py-4 sm:py-8">
		<div :style="`color: ${store.contentApp.colors_text_one}`" class="flex items-center justify-between">

			<!-- Menu -->
			<nav class="animate__animated animate__fadeIn">
				<ul class="grid grid-flow-col gap-4 sm:gap-8">
					<NuxtLink class="text-[10px] sm:text-sm md:text-md lg:text-lg" v-for="nav in menu" :key="nav" :to="nav.link">{{
						nav.label }}</NuxtLink>
				</ul>
			</nav>

			<!-- Logo -->
			<div class="w-[80px] sm:w-[90] md:w-[100] lg:w-[110px]">
				<img :src="imageLogo" onerror="this.src='/imgs/fiel.png'
" class="animate__animated animate__fadeIn" />
			</div>

		</div>
	</UContainer>
</template>

<script setup>

import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['imageLogo', 'menu']);

const imageLogo = computed(() => {
	return `${pathAssets}${props.imageLogo}`;
});

</script>

<style scoped></style>
