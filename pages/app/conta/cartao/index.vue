<template>
	<!-- Imagem de fundo -->
	<LpBgDefault
		:image="bgImage"
		:imageMobile="bgImageMobile"
		placeholderImage="/imgs/lp/cover_banner_3.png"
		placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png"
		:bgColor="app.layout_background_colors_app_two"
		position="fixed"
	/>
	<!-- Header -->
	<AppLayoutHeader
		v-if="app.config_will_have_hotsite"
		:hasLogout="false"
		:bgColor="app.header_colors_background_app_two"
		:textColor="app.header_colors_text_app"
		:isLogoDark="true"
	/>

	<UContainer
		class="flex justify-center items-center min-h-screen py-14 lg:pt-0"
	>
		<div
			class="grid grid-cols-1 lg:grid-cols-[500px,1fr] gap-8 lg:gap-16 justify-center items-center w-full max-w-screen-xl mx-auto"
		>
			<!-- Brand -->
			<div class="order-1 lg:order-1">
				<AppOthersImageBrandSession />
			</div>

			<!-- Formulário Credit Card -->
			<div class="order-2 lg:order-2">
				<div class="w-full pb-8 sm:pb-0">
					<AppOthersCreditCard :save="true"/>
				</div>
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';

const store = useStoreApp();
const storeCheckout = useStoreCheckout();
const app = store.contentApp;
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	middleware: ['auth-client', 'verify-accout-user-data', 'redirect-auth-user-payment-creditcard'],
});

const bgImage = computed(() => {
	return `${pathAssets}${app.layout_background_app_two}`;
});

const bgImageMobile = computed(() => {
	return `${pathAssets}${app.layout_background_app_mobile_two}`;
});
</script>

<style  scoped></style>