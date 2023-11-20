<template>
	<div v-show="!storeIncentive.loading" class="mt-10">
		<AppLayoutBgDefault />
		<UContainer>
			<div class="max-w-[700px] m-auto flex flex-col justify-center">
				<!-- Banner Principal -->
				<AppBannersCard :linkSource="storeIncentive.NextDrawLink" :hasImageDetach="true"
					:imageDetach="app.banner_image_card_one" :loading="storeIncentive.nextDrawLoading"
					:title="store.titleCardNextDraw" :subtitle="store.subtitleCardNextDraw" :countdown="storeIncentive.nextDrawDate"
					:callToAction="store.labelButtonCardNextDraw" :hasDescription="false" :description="false"
					:imageAward="storeIncentive.nextDrawFull.image" />


				<div class="fm1 flex items-center" :style="`color: ${store.contentApp.colors_text_button}`">
					<div :style="[borderColor, botaoClicado === 0 ? backgroundColorActive : backgroundColor]"
						class="flex justify-center items-center border mt-6 w-full h-8 rounded-s-lg border-e-0 text-[10px] md:text-sm cursor-pointer hover.bg-[#847248] focus:ring"
						@click="handleClick(0)">
						<p>{{ app.sessions_button_label_one }}</p>
					</div>

					<div :style="[borderColor, botaoClicado === 1 ? backgroundColorActive : backgroundColor]"
						class="buttons flex justify-center items-center border mt-6 w-full h-8 rounded-e-lg text-[10px] md:text-sm cursor-pointer focus:outline-none hover.bg-[#847248] focus:ring"
						@click="handleClick(1)">
						<p>{{ app.sessions_button_label_two }}</p>
					</div>
				</div>

				<AppGameInfoCard v-for="card in cards" class="mt-8" :titulo="card.titulo" :subtitulo="card.subtitulo"
					:customBackground="card.hasBg" :imagemSrc="card.img" :source="card.source" :date="card.date"
					:imgCard="card.imgCard" />
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

const backgroundColor = computed(() => {
	return `background-color: ${store.contentApp.colors_background_one}`;
});

const backgroundColorActive = computed(() => {
	return `background-color: ${store.contentApp.colors_background_button}`;
});

const borderColor = computed(() => {
	return `border-color: ${store.contentApp.colors_border_one}`;
});

let cards = ref([
	{
		titulo: 'Camisa de jogo autografada',
		subtitulo: 'Você foi o sorteado!',
		source: '/app/detalhes-premios',
		hasBg: true,
		img: '/imgs/premio_02.png',
		date: false,
		imgCard: '/imgs/rabiscadinha.png',
	},
	{
		titulo: 'Luva do Cássio autografada',
		subtitulo: 'Rabiscadinha',
		source: '/app/detalhes-premios',
		hasBg: false,
		img: '/imgs/exemplo_premio_luva.png',
		date: false,
		imgCard: '/imgs/sorte.svg',
	},
]);

let botaoClicado = ref(0);

const handleClick = (index) => {
	botaoClicado.value = index;
};

definePageMeta({
	middleware: process.client ? ['auth-user'] : undefined
});

onMounted(async () => {
	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);
});
</script>

<style scoped>
</style>
