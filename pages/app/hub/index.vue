<template>
	<div class="py-12">
		<BackgroundDefault />

		<UContainer>
			<BannerCard imageAward="https:\\imagedaapi.com" title="Fique atento!" subtitle="Acompanhe a contagem regressiva
pro sorteio de hoje e boa sorte!" countdown="2023-11-06T00:00:00+0000" :callToAction="false" :hasImageDetach="true" />
			<BannerRaspadinha />
			<!-- <CardPremios /> -->
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
</script>

<style scoped></style>
