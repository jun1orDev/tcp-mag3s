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

	<UContainer>  
	<!-- brand -->

	<div class="flex flex-col md:flex-row py-10 lg:grid-cols-[500px_1fr]">
		<div class="order-1 md:order-1 md:w-1/2">
			<AppOthersImageBrandSession />
		</div>
		<div class="order-2 md:order-1 md:w-1/2">
			<AppOthersCreditCard class="py-16" />
		</div>
	</div>

	</UContainer>


	<!-- brand -->
</template>

<script setup>
import { useStoreApp } from '~/stores/app';

const store = useStoreApp();
const app = store.contentApp;
const { pathAssets } = useRuntimeConfig().public;

const bgImage = computed(() => {
	return `${pathAssets}${app.layout_background_app_two}`;
});

const bgImageMobile = computed(() => {
	return `${pathAssets}${app.layout_background_app_mobile_two}`;
});
</script>

<style  scoped></style>