<template>
	<div class="py-12">
		<BackgroundDefault />

		<UContainer>
			<!-- Banner Principal -->
			<BannerCard linkSource="" :hasImageDetach="true" :imageDetach="banner_image_card_one"
				:title="banner_text_card_title_one" :subtitle="banner_text_card_subtitle_one" countdown="2023-11-15T00:00:00+0000"
				:callToAction="false" :description="false" imageAward="https://imagedaapi.com" />

			<!-- Separador -->
			<div class="py-2"></div>

			<!-- Banner Secundário -->
			<BannerCard2 linkSource="https://teste.com" :title="banner_text_card_title_two" :subtitle="banner_text_card_subtitle_two" :imageDetach="banner_image_card_two" :callToAction="banner_text_card_label_button_two" />

			<!--<CardPremios /> -->
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const {
	banner_text_card_title_one,
	banner_text_card_subtitle_one,
	banner_image_card_one,
	banner_text_card_title_two,
	banner_text_card_subtitle_two,
	banner_image_card_two,
	banner_text_card_label_button_two } = useStoreApp().contentApp;
</script>

<style scoped></style>
