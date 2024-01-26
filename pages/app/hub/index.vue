<template>
	<div v-show="!storeIncentive.loading" class="min-h-screen flex flex-col justify-between">
		<AppLayoutBgDefault />

		<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="true" :bgColor="app.header_colors_background_app"
			:textColor="app.header_colors_text_app" :isLogoDark="false" />

		<UContainer class="pt-12" :class="hasHeader">

			<div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 lg:gap-3" :class="hasRafflesSimplePurchase">
				<!-- Banner Principal -->
				<AppBannersCard :linkSource="storeIncentive.NextDrawLink" :hasImageDetach="!store.hasHotSiteOrRaffle"
					:imageDetach="app.banner_image_card_one" :loading="storeIncentive.nextDrawLoading"
					:title="store.titleCardNextDraw" :subtitle="store.subtitleCardNextDraw" :countdown="storeIncentive.nextDrawDate"
					:callToAction="store.labelButtonCardNextDraw" :hasDescription="false" :description="false"
					:imageAward="storeIncentive.nextDrawFull.image" />

				<!-- Compra simplificada de pacote -->
				<CheckoutSimplePurchase v-if="app.config_will_have_raffle" class="row-span-2" />

				<!-- Banner Secundário -->
				<AppBannersCard2 v-if="app.config_will_have_scratch_card" :linkSource="store.linkCardScratchQtd"
					:hasQtdDescriptionFigure="storeIncentive.hasScratchCardQtd"
					:qtdDescriptionFigure="storeIncentive.gamification.qtdScratchCard" :title="store.titleCardScratchQtd"
					:subtitle="store.subtitleCardScratchQtd" :imageDetach="app.banner_image_card_two"
					:callToAction="store.callToActionCardScratchQtd" />
			</div>

			<!-- Separador -->
			<div class="h-1 md:h-2"></div>

			<div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 items-start lg:items-center gap-1 lg:gap-3"
				:class="hasRafflesSimplePurchaseTwo">
				<!-- Banner Destacado -->
				<AppBannersCard3 class="" linkSource="/app/meus-premios" :imageDetach="app.banner_image_card_three"
					:description="app.banner_text_card_description_three" />

				<!-- Banners Duplos -->
				<div v-if="!app.config_will_have_raffle" class="grid grid-cols-2 gap-4 md:gap-5 lg:row-start-1 lg:row-span-2">
					<!-- Lado Esquerdo -->
					<AppBannersCard4 :linkSource="storeIncentive.lastDrawHeldLink" :background="app.banner_background_card_three"
						:title="app.banner_text_card_title_three" :callToAction="app.banner_text_card_label_button_one"
						:loading="storeIncentive.lastDrawLoading" :awards="[storeIncentive.lastDrawHeldFull]" :carouselAutoPlay="0" />

					<!-- Lado Direito -->
					<AppBannersCard4 linkSource="" :background="app.banner_background_card_four"
						:title="app.banner_text_card_title_four" :callToAction="false" :loading="storeIncentive.nextDrawLoading"
						:awards="storeIncentive.listDrawsUpcomingLimited(5)" :carouselAutoPlay="5000" />
				</div>

				<!-- Banner Blog -->
				<AppBannersCard5 class="" :linkSource="app.banner_link_external_card_one"
					:imageDetach="app.banner_image_card_four" :description="app.banner_text_card_description_four" />
			</div>

			<!-- Menu Behaviour -->
			<AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
			<div v-if="app.config_will_have_hotsite">
				<AppLayoutMenuBehaviour />
				<div class="mt-16 md:mt-32"></div>
			</div>
		</UContainer>

		<AppLayoutFooter v-if="!app.config_will_have_hotsite" class="lg:mt-10" :imageLogo="app.brand_image_two"
			:menu="store.footerApp.menu" />
	</div>

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

import { useStoreIncentive } from '~/stores/incentive';
const storeIncentive = useStoreIncentive();

definePageMeta({
	middleware: ['auth-user', 'auth-client', 'purchase-list-packages']
});

const hasHeader = computed(() => {
	return {
		'pt-14 lg:pt-20': app.config_will_have_hotsite
	}
});

const hasRafflesSimplePurchase = computed(() => {
	return {
		'lg:gap-6': app.config_will_have_raffle,
	}
});

const hasRafflesSimplePurchaseTwo = computed(() => {
	return {
		'lg:grid-rows-1': app.config_will_have_raffle,
	}
});

onMounted(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);

	// Menu Habilitado
	store.selectMenuBehaviour(1, 'enable', true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Não exibir a opção comprar no Menu quando for app de Rifas
	store.selectMenuBehaviour(3, 'showing', !app.config_will_have_raffle);
});
</script>

<style scoped></style>
