<template>
	<AppLayoutBgDefault />
	<div v-show="!storeIncentive.loading" class="" :style="`color: ${store.contentApp.colors_text_one}`">

		<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app" :textColor="app.header_colors_text_app" :isLogoDark="false" />

		<UContainer class="py-12" :class="hasHeader">
			<!-- Banner Principal -->
			<div class="max-w-[700px] m-auto flex justify-center">
				<AppBannersCard linkSource="" :hasImageDetach="false" imageDetach=""
					:loading="storeIncentive.loadingChosenDrawFull" :title="storeIncentive.revealChosenDrawFull.fullDate"
					:subtitle="storeIncentive.revealChosenDrawFull.description" :countdown="false" :callToAction="false"
					:hasDescription="true" :description="store.descriptionRevealDrawPrize"
					:imageAward="storeIncentive.revealChosenDrawFull.image" />
			</div>

			<!-- Separador -->
			<div class="h-6"></div>

			<!-- Números do Sorteio Atual -->
			<div v-if="storeIncentive.showDrawnNumbersToday">
				<h1 class="mb-2 lg:mb-5 fm3 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] lg:text-center">{{
					store.contentApp.sessions_title_one }}</h1>
				<div
					class="grid grid-cols-[repeat(4,40px)] md:grid-cols-[repeat(4,50px)] lg:grid-cols-[repeat(4,60px)] min-h-[40px] md:min-h-[50px] lg:min-h-[60px] gap-1 justify-center animate__animated animate__fadeIn">
					<AppGameNumberDraw v-for="drawToday in storeIncentive.drawnNumbersToday" :numberDraw="drawToday.number"
						:status="drawToday.status" />
				</div>
				<!-- Separador de Números -->
				<hr class="my-5 w-full sm:w-1/3 xl:w-1/4 m-auto borderSep">
			</div>

			<!-- Números da sorte do usuário -->
			<ul class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate__animated animate__fadeInLeft"
				ref="animateNumbersUser">
				<li v-for="dozensOfNumbers in storeIncentive.luckyNumbersUser" :key="dozensOfNumbers.id">
					<ul
						class="grid grid-cols-[repeat(4,40px)] md:grid-cols-[repeat(4,50px)] lg:grid-cols-[repeat(4,60px)] min-h-[40px] md:min-h-[50px] lg:min-h-[60px] gap-1 justify-center animate__animated animate__fadeIn">
						<AppGameNumberDraw v-for="(dozensNumbers, index) in dozensOfNumbers.dozens" :numberDraw="dozensNumbers.number"
							:status="dozensNumbers.status" :key="index" />
					</ul>
				</li>
			</ul>

		</UContainer>

		<!-- Modal de interação do prêmio -->
		<AppGameModalPrize />
	</div>

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

import { useStoreIncentive } from '~/stores/incentive';
const storeIncentive = useStoreIncentive();

definePageMeta({
	middleware: ['auth-user', 'reveal-chosen-draw']
});

const borderSept = store.contentApp.colors_border_two;

const [animateNumbersUser] = useAutoAnimate({
	duration: 1000
});

const hasHeader = computed(() => {
	return {
		'py-14 lg:py-24': app.config_will_have_hotsite
	}
});

onMounted(() => {
	switch (storeIncentive.gamification.lotteryDraws.LuckyNumbersWereDrawn) {
		case true:
			store.openModalPrizeResult(
				store.contentApp.modal_text_prize_title_three,
				store.contentApp.modal_text_prize_subtitle_three,
				store.contentApp.modal_text_prize_label_three,
				'details');
			break;

		case false:
			store.openModalPrizeResult(
				store.contentApp.modal_text_prize_title_two,
				store.contentApp.modal_text_prize_subtitle_two,
				store.contentApp.modal_text_prize_label_two,
				'back');
			break;

		case null:
			setTimeout(() => {
				store.openModalPrizeResult(
					store.contentApp.modal_text_prize_title_one,
					store.contentApp.modal_text_prize_subtitle_one,
					store.contentApp.modal_text_prize_label_one,
					'reveal');
			}, 1000);
			break;
	}
});
</script>

<style scoped>
.borderSep {
	border-color: v-bind(borderSept);
}
</style>
