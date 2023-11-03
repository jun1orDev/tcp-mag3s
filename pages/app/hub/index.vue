<template>
	<div class="py-12">
		<BackgroundDefault />

		<UContainer>
			<BannerCard imageAward="https:\\www.google.com" title="Fique atento!" subtitle="Acompanhe a contagem regressiva
pro sorteio de hoje e boa sorte!" :hasImageDetach="true" />
			<!-- <BannerRaspadinha />
			<CardPremios /> -->
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
</script>

<style scoped></style>
