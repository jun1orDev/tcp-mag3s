<template>
	<div v-show="!storeIncentive.loading" class="py-12">
		<AppLayoutBgDefault />

		<UContainer>
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
import { useStoreIncentive } from '~/stores/incentive';
const storeIncentive = useStoreIncentive();

let cards = [
	{ titulo: 'Camisa de jogo autografada', subtitulo: 'Você foi o sorteado!', source: '/app/detalhes-premios', hasBg: true, img: '/imgs/premio_02.png', date: { day: '24', month: 'Jun' } },
	{ titulo: 'Luva do cassio autografada', subtitulo: '', source: '/app/detalhes-premios', hasBg: false, img: '/imgs/exemplo_premio_luva.png', date: { day: '12', month: 'Fev' } },
];

definePageMeta({
	middleware: process.client ? ['auth-user'] : undefined
});
</script>

<style scoped></style>
