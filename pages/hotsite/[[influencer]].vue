<template>
	<div>
		<!-- Header -->
		<LpHeader/>

		<!-- Banner -->
		<LpBanner/>

		<!-- Steps Register -->
		<LpStepsRegister/>

		<!-- Sesstions -->
		<LpSession title="R$200.000,00" description="SÃO MAIS DE R$200.000,00 EM PRÊMIOS NAS RASPADINHAS DIGITAIS PRA VOCÊ DESCOBRIR DIRETO NA TELA DO SEU COMPUTADOR E CELULAR" image="/imgs/lp/session_placeholder.png" :bgImage="bgImageSessionOne" :bgImageMobile="bgMobileImageSessionOne" positionText="left" positionImage="right"/>

		<LpSession title="RANGE ROVER" description="CONCORRA A UMA RANGE ROVER NO FINAL DA PROMOÇÃO COM SEUS NÚMEROS DA SORTE!" image="/imgs/lp/session_placeholder_2.png" :bgImage="bgImageSessionTwo" :bgImageMobile="bgMobileImageSessionTwo" positionText="right" positionImage="left"/>

		<!-- Call to action -->
		<LpCallToAction/>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

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
	middleware: process.client ? ['chosen-influencer'] : undefined
});

</script>

<style scoped>

</style>
