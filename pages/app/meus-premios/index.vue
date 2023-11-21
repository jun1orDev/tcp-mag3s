<template>
	<div v-show="!storeIncentive.loading" :style="textColor" class="mt-10">
		<AppLayoutBgDefault />
		<UContainer>
			<div class="max-w-[700px] m-auto flex flex-col justify-center">
				<!-- Banner Principal -->
				<AppBannersCard :linkSource="storeIncentive.NextDrawLink" :hasImageDetach="true"
					:imageDetach="app.banner_image_card_one" :loading="storeIncentive.nextDrawLoading"
					:title="store.titleCardNextDraw" :subtitle="store.subtitleCardNextDraw" :countdown="storeIncentive.nextDrawDate"
					:callToAction="store.labelButtonCardNextDraw" :hasDescription="false" :description="false"
					:imageAward="storeIncentive.nextDrawFull.image" />
				<!-- Conteúdo -->
				<div v-if="storeIncentive.hasLotteryPrizesWon">
					<!-- Filtro dos prêmios -->
					<div class="fm1 flex items-center animate__animated animate__fadeIn"
						:style="`color: ${store.contentApp.colors_text_button}`">
						<div :style="[borderColor, filterPrizes === 0 ? backgroundColorActive : backgroundColor]"
							class="flex justify-center items-center border mt-6 w-full h-8 rounded-s-lg border-e-0 text-[10px] md:text-sm cursor-pointer focus:ring"
							@click="handleClick(0)">
							<p>{{ app.sessions_button_label_one }}</p>
						</div>

						<div :style="[borderColor, filterPrizes === 1 ? backgroundColorActive : backgroundColor]"
							class="buttons flex justify-center items-center border mt-6 w-full h-8 rounded-e-lg text-[10px] md:text-sm cursor-pointer focus:outline-none focus:ring"
							@click="handleClick(1)">
							<p>{{ app.sessions_button_label_two }}</p>
						</div>
					</div>

					<!-- Lista dos prêmios -->
					<div class="animate__animated animate__fadeInUp">
						<AppGameInfoCard v-for="prize in storeIncentive.lotteryPrizesWon" class="mt-8" :titulo="prize.name"
							:subtitulo="store.descriptionPrizes(prize.typePrize)" :hasBgGradient="prize.typePrizeToggle"
							:imagemSrc="prize.image" :link="`/app/detalhe-premio/${prize.id}`" date=""
							:imgCard="store.imgTypePrizes(prize.typePrize)" />
					</div>
				</div>
				<!-- <h1 v-if="storeIncentive.loadingInventory && !storeIncentive.hasLotteryPrizesWon" class="text-center text-xl animate__animated animate__fadeIn">Não há prêmios no momento!</h1> -->

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

const textColor = computed(() => {
	return `color: ${app.colors_text_one}`;
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

let filterPrizes = ref(0);

const handleClick = (index) => {
	filterPrizes.value = index;
};

definePageMeta({
	middleware: process.client ? ['auth-user'] : undefined
});

onMounted(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);
});
</script>

<style scoped></style>
