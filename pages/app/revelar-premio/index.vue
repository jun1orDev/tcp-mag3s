<template>
	<div class="py-12" :style="`color: ${store.contentApp.colors_text_one}`">
		<BackgroundDefault />

		<UContainer>
			<!-- Banner Principal -->
			<BannerCard linkSource="" :hasImageDetach="false" imageDetach="" title="21 DE NOVEMBRO, 2023"
				subtitle="Luva autografada do Cassio" :countdown="false" :callToAction="false"
				description="Números válidos até 21/11/2023" imageAward="https://imagedaapi.com" />

			<!-- Separador -->
			<div class="h-6"></div>

			<!-- Números do Sorteio Atual -->
			<div v-if="store.showDrawnNumbersToday">
				<h1 class="mb-2 lg:mb-5 fm3 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] lg:text-center">{{
					store.contentApp.sessions_title_one }}</h1>
				<div
					class="grid grid-cols-[repeat(7,40px)] md:grid-cols-[repeat(7,50px)] lg:grid-cols-[repeat(7,60px)] min-h-[40px] md:min-h-[50px] lg:min-h-[60px] gap-1 justify-center animate__animated animate__fadeIn">
					<NumeroSorteio v-for="number in store.drawnNumbersToday" :numberDraw="number" status="awarded" />
				</div>
				<!-- Separador de Números -->
				<hr class="my-8 w-full sm:w-2/4 md:w-2/3 lg:w-2/5 m-auto borderSep">
			</div>

			<!-- Números da sorte do usuário -->
			<div class="grid grid-cols-1 gap-6">
				<div v-for="dezenas in store.luckyNumersUser">
					<div
						class="grid grid-cols-[repeat(7,40px)] md:grid-cols-[repeat(7,50px)] lg:grid-cols-[repeat(7,60px)] min-h-[40px] md:min-h-[50px] lg:min-h-[60px] gap-1 justify-center animate__animated animate__fadeIn">
						<NumeroSorteio v-for="dezena in dezenas.numbers" :numberDraw="dezena.number" :status="dezena.status" />
					</div>
				</div>
			</div>

		</UContainer>

		<!-- Modal de interação do prêmio -->
		<ModalPrize />
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

onMounted(() => {
	if (store.LuckyNumbersWereDrawn) {
		store.openModalPrizeResult(
			store.contentApp.modal_text_prize_title_three,
			store.contentApp.modal_text_prize_subtitle_three,
			store.contentApp.modal_text_prize_label_three,
			'details');
	} else {
		store.openModalPrizeResult(
			store.contentApp.modal_text_prize_title_one,
			store.contentApp.modal_text_prize_subtitle_one,
			store.contentApp.modal_text_prize_label_one,
			'reveal');
	}
})

</script>

<style scoped>
.borderSep {
	border-color: #FFBE00;
}
</style>
