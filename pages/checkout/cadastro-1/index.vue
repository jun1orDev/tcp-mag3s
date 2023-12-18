<template>
	<div>
		<p>vida loka pt.1</p>

		<UButton size="xl" label="continuar" type="submit" :ui="configButton" :style="[colorBgButton, colorTextButton]"
			class="fm3" @click="storeCheckout.purchasePackage(storeCheckout.packageChosen.id, '/checkout/cadastro-2')" />
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';

const store = useStoreApp();
const app = store.contentApp;
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	layout: 'checkout-default',
	middleware: ['auth-client', 'purchase-list-packages', 'purchase-chosen-package']
});

onMounted(() => {
	storeCheckout.progressPurchase(
		[
			{ step: 1, complete: false },
			{ step: 2, complete: false },
			{ step: 3, complete: false },
		],
		16,
		true);
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
