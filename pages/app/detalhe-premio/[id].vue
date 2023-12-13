<template>
	<AppLayoutBgDefault />

	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" />

	<div class="min-h-screen flex items-center pt-12" :class="hasHeader" v-show="!storeIncentive.loading"
		:style="textColor">

		<UContainer>
			<!-- Imagem do Prêmio -->
			<div v-show="storeIncentive.loadingInventory" class="animate__animated animate__zoomIn">
				<img :src="storeIncentive.choosePrizeDetails.image" onerror="this.src='/imgs/exemplo_premio_01.png'"
					class="justify-center m-auto w-[320px] md:w-[400px] lg:w-[300px] mt-3" />
			</div>
			<div v-if="!storeIncentive.loadingInventory"
				class="w-[300px] sm:w-[320px] md:w-[380px] h-[300px] sm:h-[320px] md:h-[380px] flex justify-center items-center m-auto">
				<AppOthersSpin />
			</div>

			<!-- Detalhes do Prêmio -->
			<div class="flex flex-col items-center mt-2">
				<div v-if="storeIncentive.choosePrizeDetails.typePrize === 'ScratchCard'">
					<div class="flex items-center animate__animated animate__fadeInDown">
						<div class="me-3">
							<img :src="imgScratchCard" onerror="this.src='/imgs/rabiscadinha.png'" class="w-[32px] md:w-[40px]" />
						</div>
						<p class="fm3 text-[16px] md:text-[24px] uppercase">
							{{ store.contentApp.sessions_title_two }}
						</p>
					</div>
				</div>
				<div v-else>
					<div class="flex items-center">
						<p class="fm3 text-[10px] md:text-[14px]">
							{{ store.contentApp.sessions_title_three }}
						</p>
					</div>
					<div class="flex items-center">
						<!-- Por enquanto não temos prêmios de sorteios nessa lista (Falar com o Cláudio) -->
						<!-- <AppGameNumberDraw v-for="drawToday in storeIncentive.drawnNumbersToday" :numberDraw="drawToday.number"
							:status="drawToday.status" /> -->
					</div>
				</div>

				<!-- Informações para contato -->
				<div class="fm1 justify-center text-center mt-4 text-[10px] md:text-[14px]">
					<p class="animate__animated animate__fadeInUp max-w-[400px]">
						{{ store.contentApp.sessions_subtitle_three }}
					</p>
				</div>

				<div class="animate__animated animate__zoomInUp mt-6">
					<div class="fm1 text-[10px] md:text-[14px]">
						<p>{{ store.contentApp.sessions_subtitle_four }}</p>
					</div>
					<div class="flex items-center justify-center mt-4">
						<img :src="ImgWhatsApp" onerror="this.src='/imgs/whats.png'" class="w-[32px] md:w-[48px] me-3" />
						<p class="fm3 text-[20px] md:text-[24px]">
							{{ store.contentApp.config_text_phone_contact }}
						</p>
					</div>
				</div>
				<div class="mt-16 lg:mt-10 animate__animated animate__fadeIn">
					<p class="fm1 text-[8px] md:text-[10px]">
						{{ store.contentApp.sessions_subtitle_six }}
					</p>
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

const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	middleware: ['auth-user', 'choose-prize-details']
});

const textColor = computed(() => {
	return `color: ${app.colors_text_one}`;
});

const imgScratchCard = computed(() => {
	return `${pathAssets}${store.contentApp.sessions_image_two}`;
});

const ImgWhatsApp = computed(() => {
	return `${pathAssets}${store.contentApp.config_image_whatsapp}`;
});

const hasHeader = computed(() => {
	return {
		'pt-14': app.config_will_have_hotsite
	}
});
</script>

<style scoped></style>
