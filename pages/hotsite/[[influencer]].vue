<template>
	<div>
		<!-- Header -->
		<LpHeader v-if="app.config_will_have_header_hotsite" />

		<!-- Banner -->
		<LpBanner />

		<!-- Steps Register -->
		<LpStepsRegister />

		<!-- Sesstions -->
		<LpSession v-if="app.config_will_have_scratch_card" :title="app.session_text_title_hotsite_one"
			:description="app.session_text_description_hotsite_one" :image="app.session_image_hotsite_one"
			:bgImage="bgImageSessionOne" :bgImageMobile="bgMobileImageSessionOne" positionText="left" positionImage="right" />

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
const toast = useToast();


//  Método para exibir o toast
onMounted(() => {
	toast.add({
		id: 'cookies',
		title: 'Cookies',
		description: 'Nós utilizamos cookies para melhorar a sua experiência neste site. Ao confirmar, você concorda com o nosso uso de cookies.',
		icon: 'i-material-symbols:cookie-outline-rounded',
		timeout: 35000,
		actions: [{
			label: 'Confirmar',
			click: () => {
			}
		}]
	})
});

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
	middleware: ['chosen-influencer']
});

</script>

<style scoped></style>
