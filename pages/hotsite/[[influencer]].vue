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
			:description="app.session_text_description_hotsite_one" :images="app.session_image_hotsite_one"
			:bgImage="bgImageSessionOne" :bgImageMobile="bgMobileImageSessionOne" positionText="left" positionImage="right" />

		<LpSession :title="app.session_text_title_hotsite_two" :description="app.session_text_description_hotsite_two"
			:images="app.session_image_hotsite_two" :bgImage="bgImageSessionTwo" :bgImageMobile="bgMobileImageSessionTwo"
			positionText="right" positionImage="left" />

		<!-- Influencers Ranking -->
		<LpInfluencerRace v-if="app.config_will_have_influencer_race" />

		<!-- Footer -->
		<LpFooter />

		<!-- Call to action -->
		<LpCallToAction />

		<ClientOnly v-if="false">
			<UModal v-model="isOpen">
				<div class="p-4">
					<h1 class="mb-5">Instalar App: {{useNuxtApp().$pwa?.isPWAInstalled}}</h1>

					<UButton size="xl" @click="startInstall()">
						Install
					</UButton>
				</div>
			</UModal>
		</ClientOnly>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	middleware: ['chosen-influencer']
});

const isOpen = ref(useNuxtApp().$pwa?.showInstallPrompt && !useNuxtApp().$pwa?.needRefresh);

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

const startInstall = async () => {
	await useNuxtApp().$pwa?.install()
}
</script>

<style scoped></style>
