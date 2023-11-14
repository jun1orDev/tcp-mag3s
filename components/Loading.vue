<template>
	<div v-if="storeIncentive.loading"
		class="absolute py-16 top-0 left-0 right-0 bottom-0 flex flex-col justify-around items-center w-full min-h-screen z-50">
		<AppLayoutBgDefault />

		<!-- Brand Secundária -->
		<div>
			<img :src="brandThree" onerror="this.src='/imgs/img_loading.png'"
				class="w-60 sm:w-[200px] md:w-[350px] lg:w-[300px]" />
		</div>

		<!-- Loading infinito -->
		<div class="flex flex-col justify-center items-center text-white lg:py-24">
			<Spin />
			<div class="mt-5 uppercase font-semibold text-xl md:text-2xl lg:text-2xl">
				<h2>Carregando...</h2>
			</div>
		</div>

		<!-- Band Principal -->
		<div>
			<img :src="brandOne" class="w-[150px] md:w-[180px] lg:w-[200px]" onerror="this.src='/imgs/img_fiel_da_sorte.png'" />
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const storeIncentive = useStoreIncentive();

const { pathAssets } = useRuntimeConfig().public;

const brandOne = computed(() => {
	return `${pathAssets}${store.contentApp.brand_image_one}`;
});

const brandThree = computed(() => {
	return `${pathAssets}${store.contentApp.brand_image_three}`;
});

</script>

<style scoped></style>
