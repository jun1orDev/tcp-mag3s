<template>
	<div v-if="store.loading"
		class="absolute py-16 top-0 left-0 right-0 bottom-0 flex flex-col justify-around items-center min-h-screen">
		<PlanoFundo />

		<!-- Brand Secundária -->
		<div>
			<img :src="brandThree" onerror="this.src='/imgs/img_loading.png'" class="w-60 sm:w-[200px] md:w-[350px] lg:w-[300px]" />
		</div>

		<!-- Loading infinito -->
		<div class="flex flex-col justify-center items-center text-white lg:py-24">
			<div class="simple-spinner relative block w-[30px] h-[30px]">
				<span class="block w-[30px] h-[30px] border-2 border-solid border-transparent rounded-full border-r-white animate-spin"></span>
			</div>
			<div class="mt-5 uppercase font-semibold">
				<h2>Carregando...</h2>
			</div>
		</div>

		<!-- Band Principal -->
		<div>
			<img :src="brandOne" />
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

const { pathAssets } = useRuntimeConfig().public;

const brandOne = computed(() => {
	return `${pathAssets}${store.contentApp.brand_image_one}`;
});

const brandThree = computed(() => {
	return `${pathAssets}${store.contentApp.brand_image_three}`;
});

</script>

<style scoped>
</style>
