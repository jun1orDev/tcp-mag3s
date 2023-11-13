<template>
	<div class="pt-12 min-h-screen flex flex-col justify-between">
		<AppLayoutBgDefault />

		<UContainer>

			<div class="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-3">
				<!-- Banner Principal -->
				<AppBannersCard linkSource="" :hasImageDetach="true" :imageDetach="app.banner_image_card_one"
					:title="app.banner_text_card_title_one" :subtitle="app.banner_text_card_subtitle_one"
					countdown="2023-11-15T00:00:00+0000" :callToAction="false" :description="false"
					imageAward="https://imagedaapi.com" />

				<!-- Separador -->
				<div class="h-1 md:h-2 lg:hidden"></div>

				<!-- Banner Secundário -->
				<AppBannersCard2 :linkSource="store.linkCardScratchQtd" :qtdDescriptionFigure="api.qtdScratchCard" :title="store.titleCardScratchQtd"
					:subtitle="store.subtitleCardScratchQtd" :imageDetach="app.banner_image_card_two"
					:callToAction="store.callToActionCardScratchQtd" />
			</div>

			<!-- Separador -->
			<div class="h-1 md:h-2"></div>

			<div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 items-start lg:items-center gap-1 lg:gap-3">
				<!-- Banner Destacado -->
				<AppBannersCard3 class="" linkSource="/app/meus-premios" :imageDetach="app.banner_image_card_three"
					:description="app.banner_text_card_description_three" />

				<!-- Banners Duplos -->
				<div class="grid grid-cols-2 gap-4 md:gap-5 lg:row-start-1 lg:row-span-2">
					<!-- Lado Esquerdo -->
					<AppBannersCard4 linkSource="/app/revelar-premio" :background="app.banner_background_card_three"
						:title="app.banner_text_card_title_three" countdown="2023-11-15T00:00:00+0000"
						:callToAction="app.banner_text_card_label_button_one" :awards="[0]" :carouselAutoPlay="false" />

					<!-- Lado Direito -->
					<AppBannersCard4 linkSource="" :background="app.banner_background_card_four"
						:title="app.banner_text_card_title_four" countdown="2023-11-15T00:00:00+0000" :callToAction="false"
						:awards="[0, 1]" :carouselAutoPlay="5000" />
				</div>

				<!-- Banner Blog -->
				<AppBannersCard5 class="" :linkSource="app.banner_link_external_card_one" :imageDetach="app.banner_image_card_four"
					:description="app.banner_text_card_description_four" />
			</div>
		</UContainer>

		<FooterApp class="lg:mt-10" :imageLogo="app.brand_image_two" :menu="store.footerApp.menu" />
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;
const api = useStoreApp().apiData;
</script>

<style scoped></style>
