<template>
	<div class="max-w-[600px] m-auto lg:w-full lg:m-0" :style="textColor">
		<div>
			<h1 v-html="titleText" class="fm3 text-xl lg:text-2xl"></h1>
		</div>

		<!-- Dados do cartão de crédito -->
		<AppOthersCreditCard :willHavePurchese="true" :hasDisableButton="false" />

	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';
import { object, string } from 'yup';

const store = useStoreApp();
const app = store.contentApp;
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	layout: 'checkout-default',
	middleware: [
		'auth-client',
		'verify-accout-user-data',
		'purchase-list-packages',
		'purchase-chosen-package',
		'redirect-auth-user-payment-creditcard',
	],
});

const textColor = computed(() => {
	return `color: ${app.layout_text_colors_login_and_checkout}`;
});

const titleText = computed(() => {
	return `${app.checkout_card_text_title}`;
});

onNuxtReady(() => {
	storeCheckout.progressPurchase(
		[
			{ step: 1, complete: true },
			{ step: 2, complete: true },
			{ step: 3, complete: false },
		],
		65,
		true
	);

	storeCheckout.formRegister.configPayment.labelButton = `finalizar pagamento`;
});
</script>

<style scoped></style>
