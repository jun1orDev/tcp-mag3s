<template>
	<div @click="storeCheckout.setQtdPackageChosen('add', +props.package.two, false)"
		class="cursor-pointer hover:scale-105 transition-all">
		<!-- Bedge de destaque -->
		<div
			class="fm1 text-[0.60rem] md:text-base lg:text-md w-full flex justify-center items-center uppercase"
			:class="props.isPopular ? 'rounded-t-xl h-7' : 'bg-transparent md:h-7'"
			:style="[colorTextBedgePopularProduct, colorBackgroundBedgePopularProduct]">
			<div>
				<span class="leading-none" v-if="props.isPopular">Mais Popular</span>
			</div>
		</div>

		<div class="p-3" :class="props.isPopular ? 'rounded-b-xl' : 'rounded-xl'"
			:style="[colorBackgroundPackage, colorTextPackage]">
			<!-- Quantidade do Produto -->
			<div class="fm2">
				<!-- Imagem representativa -->
				<div class="flex justify-center mb-2">
					<img :src="`${pathAssets}${props.package.one}`" onerror="this.src='/imgs/checkout/package_image_1.png'"
						:class="props.isPopular ? 'animate__animated animate__tada animate__delay-2s animate__repeat-2' : ''"
						class="w-1/2 md:w-auto" alt="">
				</div>
				<p class="fm3 text-3xl flex items-center justify-center">+<strong
						class="text-5xl sm:text-3xl md:text-5xl lg:text-6xl">{{
		props.package.two }}</strong></p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';
import { useStoreCheckout } from '~/stores/checkout';

const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['package', 'isPopular']);

const colorTextBedgePopularProduct = computed(() => {
	return `color: ${app.purchase_tables_text_colors_popular_product}`;
});

const colorBackgroundBedgePopularProduct = computed(() => {
	if (props.isPopular) return `background-color: ${app.purchase_tables_background_colors_popular_product}`;
});

const colorBackgroundPackage = computed(() => {
	return `background-color: ${app.purchase_tables_background_colors_package}`;
});

const colorTextPackage = computed(() => {
	return `color: ${app.purchase_tables_text_colors_package}`;
});
</script>

<style scoped></style>
