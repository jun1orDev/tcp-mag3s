<template>
	<AppLayoutBgDefault />
	<div v-show="!storeIncentive.loading">		
		<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app" :textColor="app.header_colors_text_app" :isLogoDark="false" />

		<UContainer class="py-12" :class="hasHeader">
			<AppBannersCard linkSource="/app/revelar-premio" :hasImageDetach="false" imageDetach="" title="21 DE NOVEMBRO, 2023"
				subtitle="Luva autografada do Cassio" :countdown="false" callToAction="Revelar prêmio"
				:description="false" imageAward="https://imagedaapi.com" />

			<AppGameInfoCard v-for="card in cards" class="mt-8" :titulo="card.titulo" :subtitulo="card.subtitulo"
				:customBackground="card.hasBg" :imagemSrc="card.img" :source="card.source" :date="card.date" />
		</UContainer>
	</div>

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const app = useStoreApp().contentApp;

import { useStoreIncentive } from '~/stores/incentive';
const storeIncentive = useStoreIncentive();

definePageMeta({
	middleware: ['auth-user']
});

let cards = [
	{ titulo: 'Camisa de jogo autografada', subtitulo: 'Você foi o sorteado!', source: '/app/detalhes-premios', hasBg: true, img: '/imgs/premio_02.png', date: { day: '24', month: 'Jun' } },
	{ titulo: 'Luva do cassio autografada', subtitulo: '', source: '/app/detalhes-premios', hasBg: false, img: '/imgs/exemplo_premio_luva.png', date: { day: '12', month: 'Fev' } },
];

const hasHeader = computed(() => {
	return {
		'py-14 lg:py-24': app.config_will_have_hotsite
	}
});
</script>

<style scoped></style>
