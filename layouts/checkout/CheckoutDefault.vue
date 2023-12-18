<template>
	<!-- BG padrão de fundo da página -->
	<div class="absolute">
		<LpBgDefault v-if="app.config_will_have_hotsite" :image="app.layout_background_app_two"
			:imageMobile="app.layout_background_app_mobile_two" placeholderImage="/imgs/lp/cover_banner_3.png"
			placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png" :bgColor="app.layout_background_colors_app_two"
			position="fixed" />
		<AppLayoutBgDefault v-else />
	</div>

	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app_two"
		:textColor="app.header_colors_text_app" :isLogoDark="true" />

	<UContainer id="checkout" class="min-h-screen py-20 lg:py-24" :style="textColor">

		<!-- Etapas de compra do checkout -->
		<div>
			<div class="grid grid-cols-3">

				<!-- Etapas -->
				<div v-for="item in storeCheckout.steps" class="flex flex-col justify-center items-center text-xl">
					<div :style="[colorBgButton, colorTextButton]" class="w-10 h-10 rounded-full flex justify-center items-center">
						<template v-if="storeCheckout.showingSteps">
							<UIcon v-if="item.complete" class="w-9 h-9 text-white" name="i-material-symbols-check-small-rounded" />
							<span v-else class="fm3">{{ item.step }}</span>
						</template>

						<template v-else>
							<AppOthersSpin />
						</template>
					</div>
					<p class="fm3 text-sm md:text-base lg:text-xl">{{ item.label }}</p>
				</div>
			</div>

			<UProgress v-if="storeCheckout.showingSteps" class="mt-4" :value="storeCheckout.progressPurchaseStatus" :max="100"
				:ui="configProgress" />
			<UProgress v-else class="mt-4" :ui="configProgress" animation="carousel" />

		</div>

		<div
			class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-16 justify-center items-center">

			<!-- Navegação de outras rotas do checkout -->
			<NuxtPage />

			<div class="flex justify-center">
				<CheckoutPackage :package="storeCheckout.packageChosen" :isCallToAction="false" class="mt-6 lg:mt-20 lg:rotate-12 lg:-translate-x-10" />
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';

const store = useStoreApp();
const app = store.contentApp;
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

// definePageMeta({
// 	middleware: []
// });

const textColor = computed(() => {
	return `color: ${app.layout_text_colors_login_and_checkout}`;
});

const titleText = computed(() => {
	return `${app.purchase_tables_text_title}`;
});

const descriptionText = computed(() => {
	return `${app.purchase_tables_text_description}`;
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorProgressBar = computed(() => {
	return app.layout_colors_pregress_bar_colorbase_checkout;
});

const bgColorProgressBar = computed(() => {
	return app.layout_colors_pregress_bar_bg_checkout;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const configProgress = ref({
	"progress": {
		"color": 'color-progress',
		// "track": '[&::-webkit-progress-bar]:bg-progress',
	}
});
</script>

<style>
#checkout .color-progress {
	color: v-bind(colorProgressBar);
}

#checkout .bg-progress {
	background-color: v-bind(bgColorProgressBar) !important;
}
</style>
