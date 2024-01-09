<template>
	<div v-show="!storeIncentive.loading" :style="textColor">
		<AppLayoutBgDefault />

		<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app" :textColor="app.header_colors_text_app" :isLogoDark="false" />

		<UContainer class="pt-12 py-24" :class="hasHeader">
			<div class="max-w-[700px] m-auto flex flex-col justify-center">
				<!-- Banner Principal -->
				<AppBannersCard :linkSource="storeIncentive.NextDrawLink" :hasImageDetach="true"
					:imageDetach="app.banner_image_card_one" :loading="storeIncentive.nextDrawLoading"
					:title="store.titleCardNextDraw" :subtitle="store.subtitleCardNextDraw" :countdown="storeIncentive.nextDrawDate"
					:callToAction="store.labelButtonCardNextDraw" :hasDescription="false" :description="false"
					:imageAward="storeIncentive.nextDrawFull.image" />

				<!-- Conteúdo -->
				<div v-if="storeIncentive.loadingInventory">

					<!-- Filtro dos prêmios -->
					<div v-if="storeIncentive.hasLotteryPrizesWon" class="fm1 flex items-center animate__animated animate__zoomInDown">
						<div
							:style="[textColorButton, borderColor, storeIncentive.filterPrizes === 0 ? backgroundColorActive : backgroundColor]"
							class="flex justify-center items-center border mt-6 w-full h-8 rounded-s-lg border-e-0 text-[10px] md:text-sm cursor-pointer"
							@click="handleClick(0, 'ScratchCard')">
							<p>{{ app.sessions_button_label_one }}</p>
						</div>

						<div
							:style="[textColorButton, borderColor, storeIncentive.filterPrizes === 1 ? backgroundColorActive : backgroundColor]"
							class="buttons flex justify-center items-center border mt-6 w-full h-8 text-[10px] md:text-sm cursor-pointer"
							@click="handleClick(1, 'luckyNumber')">
							<p>{{ app.sessions_button_label_two }}</p>
						</div>

						<div
							:style="[textColorButton, borderColor, storeIncentive.filterPrizes === 2 ? backgroundColorActive : backgroundColor]"
							class="buttons flex justify-center items-center border mt-6 w-full h-8 rounded-e-lg text-[10px] md:text-sm cursor-pointer"
							@click="handleClick(2)">
							<p>{{ app.sessions_button_label_three }}</p>
						</div>
					</div>

					<div v-if="storeIncentive.hasLotteryPrizesWonFilter">
						<!-- Lista dos prêmios -->
						<div class="animate__animated animate__fadeInUp" ref="animateMyPrizes">
							<AppGameInfoCard v-for="prize in storeIncentive.lotteryPrizesWonFilter" class="mt-8" :titulo="prize.name"
								:subtitulo="store.descriptionPrizes(prize.typePrize)" :hasBgGradient="prize.prizeTypeStyle"
								:imagemSrc="prize.image" :link="`/app/detalhe-premio/${prize.id}`" date=""
								:imgCard="store.imgTypePrizes(prize.typePrize)" :key="prize.id" />
						</div>
					</div>

					<h1 v-else class="mt-16 text-center text-xl animate__animated animate__fadeIn">Não há prêmios no momento!</h1>
				</div>
				<div v-else class="mt-16 w-[100px] sm:w-[120px] md:w-[140px] h-full flex justify-center items-center m-auto">
					<AppOthersSpin />
				</div>

			</div>
		</UContainer>
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
	middleware: ['auth-user']
});

const [animateMyPrizes] = useAutoAnimate({
	duration: 400
});

const textColor = computed(() => {
	return `color: ${app.colors_text_one}`;
});

const textColorButton = computed(() => {
	return `color: ${app.colors_text_button}`;
});

const backgroundColor = computed(() => {
	return `background-color: ${app.colors_background_one}`;
});

const backgroundColorActive = computed(() => {
	return `background-color: ${app.colors_background_button}`;
});

const borderColor = computed(() => {
	return `border-color: ${app.colors_border_one}`;
});

const handleClick = (position, filter) => {
	storeIncentive.filterPrizes = position;

	storeIncentive.filterLotteryPrizesWon(filter);
};

const hasHeader = computed(() => {
	return {
		'pt-14 lg:pt-24': app.config_will_have_hotsite
	}
});

onMounted(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);
});
</script>

<style scoped></style>
