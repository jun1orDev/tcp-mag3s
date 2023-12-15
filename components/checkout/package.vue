<template>
	<div class="w-full max-w-[400px] hover:scale-105 transition-all">
		<!-- Bedge de destaque -->
		<div class="fm3 w-full h-7 flex justify-center items-center uppercase"
			:class="props.package.isPopularProduct ? 'bg-green-400 rounded-t-xl' : 'bg-transparent'"
			:style="[colorTextBedgePopularProduct, colorBackgroundBedgePopularProduct]">
			<p v-if="props.package.isPopularProduct">Mais Popular</p>
		</div>

		<div class="min-h-[380px] flex flex-col justify-between items-center py-6 px-4"
			:class="props.package.isPopularProduct ? 'rounded-b-xl' : 'rounded-xl'"
			:style="[colorBackgroundPackage, colorTextPackage]">

			<!-- Preço do Produto -->
			<div class="fm3">
				<!-- Imagem representativa -->
				<div class="flex justify-center mb-2">
					<img :src="imageRepresentative" onerror="this.src='/imgs/checkout/package_image_1.png'"
						:class="props.package.isPopularProduct ? 'animate__animated animate__tada animate__delay-2s animate__repeat-2' : ''"
						alt="">
				</div>
				<p><strong class="text-4xl">{{ price }}</strong></p>
			</div>

			<!-- Conteúdo do Produto -->
			<div class="w-full flex flex-col justify-start items-start">
				<div v-for="(item, index) in props.package.items" class="w-full">
					<!-- Divisor -->
					<hr class="w-full border-t-slate-300" :class="index > 0 ? 'my-3' : 'mb-3'">

					<!-- Descrição -->
					<p class="fm1"><strong class="hidden">{{ item.qtd }}</strong> {{ item.description }}</p>
				</div>
			</div>

			<!-- Botão de compra -->
			<div class="flex justify-center">
				<UButton size="xl" label="comprar" type="submit" :ui="configButton" :style="[colorBgButton, colorTextButton]"
					class="fm3" />
			</div>
		</div>

	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['package']);

const imageRepresentative = computed(() => {
	return `${pathAssets}${props.package.image}`
})

const price = computed(() => {
	return props.package.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', currencyDisplay: "symbol" });
})

const colorTextBedgePopularProduct = computed(() => {
	return `color: ${app.purchase_tables_text_colors_popular_product}`;
});

const colorBackgroundBedgePopularProduct = computed(() => {
	if (props.package.isPopularProduct) return `background-color: ${app.purchase_tables_background_colors_popular_product}`;
});

const colorBackgroundPackage = computed(() => {
	return `background-color: ${app.purchase_tables_background_colors_package}`;
});

const colorTextPackage = computed(() => {
	return `color: ${app.purchase_tables_text_colors_package}`;
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const configButton = ref({
	"rounded": 'rounded-full',
	"padding": {
		"xl": "px-10 py-2"
	},
});
</script>

<style lang="scss" scoped></style>
