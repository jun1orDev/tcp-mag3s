<template>
	<div v-show="!storeIncentive.loading" :style="textColor">
		<AppLayoutBgDefault />

		<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app"
			:textColor="app.header_colors_text_app" :isLogoDark="false" />

		<UContainer class="pt-12 py-24" :class="hasHeader">
			<div class="max-w-[700px] m-auto flex flex-col justify-center">
				<!-- Banner Principal -->
				<div>
					<!-- Caso seja um banner com carousel -->
					<Carousel v-if="app.config_will_have_carousel_banner_main" id="carousel-card-main"
						class="w-full flex flex-col justify-between" autoplay="6500" :wrap-around="true"
						:pause-autoplay-on-hover="true">
						<Slide v-for="slide in storeIncentive.listDraws" :key="slide" class="flex flex-col">
							<AppBannersCard :linkSource="storeIncentive.NextDrawLink(slide)" :hasImageDetach="!store.hasHotSiteOrRaffle"
								:imageDetach="app.banner_image_card_one" :loading="storeIncentive.nextDrawLoading(true)"
								:title="store.titleCardNextDraw(slide.date)" :subtitle="store.subtitleCardNextDraw(slide.date)"
								:countdown="slide.date" :callToAction="store.labelButtonCardNextDraw(slide.date)" :hasDescription="false"
								:description="false" :imageAward="slide.image" />
						</Slide>
					</Carousel>

					<AppBannersCard v-else :linkSource="storeIncentive.NextDrawLink()" :hasImageDetach="!store.hasHotSiteOrRaffle"
						:imageDetach="app.banner_image_card_one" :loading="storeIncentive.nextDrawLoading()"
						:title="store.titleCardNextDraw()" :subtitle="store.subtitleCardNextDraw()"
						:countdown="storeIncentive.nextDrawDate" :callToAction="store.labelButtonCardNextDraw()"
						:hasDescription="false" :description="false" :imageAward="storeIncentive.nextDrawFull.image" />
				</div>

				<!-- Conteúdo -->
				<div v-if="storeIncentive.loadingInventory">

					<!-- Filtro dos prêmios -->
					<div v-if="storeIncentive.hasLotteryPrizesWon && app.config_will_have_scratch_card"
						class="fm1 flex items-center animate__animated animate__zoomInDown">
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

					<div v-else
						class="text-1xl md:text-2xl lg:text-3xl flex justify-center items-center mt-6 animate__animated animate__fadeInDown">
						<Icon name="i-ic-baseline-warning" class="me-4 w-5 lg:w-8 h-5 lg:h-8" />
						<h2>Você ainda não ganhou prêmios!</h2>
					</div>
				</div>
				<div v-else class="mt-16 w-[100px] sm:w-[120px] md:w-[140px] h-full flex justify-center items-center m-auto">
					<AppOthersSpin />
				</div>
			</div>

			<!-- Menu Behaviour -->
			<div v-if="storeIncentive.userLoggedIn">
				<AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
				<div v-if="app.config_will_have_hotsite">
					<div :class="!storeIncentive.hasLotteryPrizesWonFilter ? 'mt-16 md:mt-64' : 'mt-12 md:mt-32'"></div>
					<AppLayoutMenuBehaviour />
				</div>
			</div>
		</UContainer>
	</div>

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = useStoreApp().contentApp;
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

onNuxtReady(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);

	// Menu Habilitado
	store.selectMenuBehaviour(0, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(4, 'path', `/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`);
});
</script>

<style scoped></style>
