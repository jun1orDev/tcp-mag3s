<template>
	<div class="py-12">
		<BackgroundDefault />

		<UContainer>

			<!-- Banner Principal -->
			<BannerCard linkSource="" :hasImageDetach="true" :imageDetach="banner_image_card_on" :title="banner_text_card_title_one"
				:subtitle="banner_text_card_subtitle_one" countdown="2023-11-15T00:00:00+0000" :callToAction="false"
				:description="false" imageAward="https://imagedaapi.com"/>
			<!-- <BannerRaspadinha />
			<CardPremios /> -->
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const { banner_text_card_title_one, banner_text_card_subtitle_one, banner_image_card_on } = useStoreApp().contentApp;
</script>

<style scoped></style>
