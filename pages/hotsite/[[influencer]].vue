<template>
	<div>
		<!-- Header -->
		<LpHeader />

		<!-- Banner -->
		<LpBanner />

		<!-- Steps Register -->
		<LpStepsRegister />

		<!-- Sesstions -->
		<LpSession :title="app.session_text_title_hotsite_one" :description="app.session_text_description_hotsite_one"
			:image="app.session_image_hotsite_one" :bgImage="bgImageSessionOne" :bgImageMobile="bgMobileImageSessionOne"
			positionText="left" positionImage="right" />

		<LpSession :title="app.session_text_title_hotsite_two" :description="app.session_text_description_hotsite_two"
			:image="app.session_image_hotsite_two" :bgImage="bgImageSessionTwo" :bgImageMobile="bgMobileImageSessionTwo"
			positionText="right" positionImage="left" />

		<!-- Influencers Ranking -->
		<LpInfluencerRace v-if="app.config_will_have_influencer_race" />

		<!-- Footer -->
		<LpFooter />

		<!-- Call to action -->
		<LpCallToAction />
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

// Seção 1
const bgMobileImageSessionOne = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_mobile_two}`;
});

const bgImageSessionOne = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_two}`;
});

// Seção 2
const bgMobileImageSessionTwo = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_mobile_two}`;
});

const bgImageSessionTwo = computed(() => {
	return `${pathAssets}${app.layout_background_hotsite_two}`;
});

definePageMeta({
	middleware: process.client ? ['chosen-influencer'] : undefined
});

</script>

<style scoped></style>
