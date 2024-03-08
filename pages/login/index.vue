<template>
	<!-- BG padrão de fundo da página -->
	<div class="absolute">
		<LpBgDefault v-if="app.config_will_have_hotsite" :image="bgImage"
			:imageMobile="bgImageMobile" placeholderImage="/imgs/lp/cover_banner_3.png"
			placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png" :bgColor="app.layout_background_colors_app_two"
			position="fixed" />
		<AppLayoutBgDefault v-else />
	</div>

	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app_two"
		:textColor="app.header_colors_text_app" :isLogoDark="true" />

	<UContainer class="flex justify-center min-h-screen pt-14 pb-32 lg:pt-0" :class="isItemsCenter" :style="textColor">
		<div class="grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 lg:gap-16 justify-center items-center w-screen"
			:class="isGridLayout">
			<!-- brand -->
			<AppOthersImageBrandSession />

			<div class="w-full sm:pb-0">
				<!-- Titulo -->
				<p class="fm3 text-xl mb-4" v-html="titleText"></p>

				<!-- Login e senha -->
				<LoginForm :isCheckout="false" />

				<!-- Novo Cadastro -->
				<p class="text-center mt-4">Não tem conta? <NuxtLink :to="{ path: '/checkout/pacotes' }"
						class="fm3 decoration-solid">
						Clique aqui</NuxtLink>
				</p>

			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	middleware: ['login-app']
});

const bgImage = computed(() => {
	return `${pathAssets}${app.layout_background_app_two}`;
});

const bgImageMobile = computed(() => {
	return `${pathAssets}${app.layout_background_app_mobile_two}`;
});

const textColor = computed(() => {
	return `color: ${app.layout_text_colors_login_and_checkout}`;
});

const titleText = computed(() => {
	return `${app.login_text_title}`;
});

const isGridLayout = computed(() => {
	return {
		'grid': app.config_will_have_image_brand_session_hotsite,
	};
});

const isItemsCenter = computed(() => {
	return {
		'items-center': !app.config_will_have_image_brand_session_hotsite,
	};
});
</script>

<style></style>
