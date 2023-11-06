<template>
	<div class="py-12">
		<BackgroundDefault />

		<UContainer>

			<div class="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-3">
				<!-- Banner Principal -->
				<BannerCard linkSource="" :hasImageDetach="true" :imageDetach="store.banner_image_card_one"
					:title="store.banner_text_card_title_one" :subtitle="store.banner_text_card_subtitle_one"
					countdown="2023-11-15T00:00:00+0000" :callToAction="false" :description="false"
					imageAward="https://imagedaapi.com" />

				<!-- Separador -->
				<div class="h-1 md:h-2 lg:hidden"></div>

				<!-- Banner Secundário -->
				<BannerCard2 linkSource="/app/gamification" :title="store.banner_text_card_title_two"
					:subtitle="store.banner_text_card_subtitle_two" :imageDetach="store.banner_image_card_two"
					:callToAction="store.banner_text_card_label_button_two" />
			</div>

			<!-- Separador -->
			<div class="h-1 md:h-2"></div>

			<div class="grid grid-cols-1 lg:grid-cols-2 items-start lg:gap-3">

				<!-- Banner Destacado -->
				<BannerCard3 linkSource="/app/meus-premios" :imageDetach="store.banner_image_card_three"
					:description="store.banner_text_card_description_three" />

				<!-- Separador -->
				<div class="h-1 md:h-2 lg:hidden"></div>

				<!-- Banners Duplos -->
				<div class="grid grid-cols-2 gap-4 md:gap-5">
					<!-- Lado Esquerdo -->
					<BannerCard4 linkSource="/app/revelar-premio" :background="store.banner_background_card_three"
						:title="store.banner_text_card_title_three" countdown="2023-11-15T00:00:00+0000" :callToAction="store.banner_text_card_label_button_one"
						:awards="[0]" :carouselAutoPlay="false" />

					<!-- Lado Direito -->
					<BannerCard4 linkSource="" :background="store.banner_background_card_four"
						:title="store.banner_text_card_title_four" countdown="2023-11-15T00:00:00+0000" :callToAction="false"
						:awards="[0,1]" :carouselAutoPlay="5000" />
				</div>
			</div>
			<!--<CardPremios /> -->
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp().contentApp;
</script>

<style scoped></style>
