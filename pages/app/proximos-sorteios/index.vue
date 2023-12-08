<template>
	<div v-show="!storeIncentive.loading" class="py-12">
		<AppLayoutBgDefault />

		<UContainer>
			<!-- Banner Principal com Carousel -->
			<Carousel id="carousel-next-prizes" :autoplay="5000" :wrap-around="true" :pause-autoplay-on-hover="true">
				<Slide v-for="slide in 4" :key="slide">
					<AppBannersCard linkSource="/app/revelar-premio" :hasImageDetach="false" imageDetach="" title="21 DE NOVEMBRO, 2023"
						subtitle="Luva autografada do Cassio" :countdown="false" :callToAction="false"
						description="Números válidos até 21/11/2023" imageAward="https://imagedaapi.com" />
				</Slide>

				<template #addons>
					<Pagination />
				</template>
			</Carousel>

			<!-- Pesquisar -->
			<AppOthersInputSearching class="mt-6" />

			<AppGameInfoCard v-for="card in cards" class="mt-8" :titulo="card.titulo" :subtitulo="card.subtitulo"
				:customBackground="card.hasBg" :imagemSrc="card.img" :source="card.source" :date="card.date" />
		</UContainer>
	</div>

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp().contentApp;

import { useStoreIncentive } from '~/stores/incentive';
const storeIncentive = useStoreIncentive();

const bgCarouselPagination = computed(() => {
	return store.colors_carousel_pagination_background;
})

const bgCarouselPaginationActive = computed(() => {
	return store.colors_carousel_pagination_active;
})

let cards = ref([
	{ titulo: 'Camisa de jogo autografada', subtitulo: 'Você foi o sorteado!', source: '/detalhes-premios', hasBg: true, img: '/imgs/premio_02.png', date: { day: '24', month: 'Jun' } },
	{ titulo: 'Luva do cassio autografada', subtitulo: '', source: '/detalhes-premios', hasBg: false, img: '/imgs/exemplo_premio_luva.png', date: { day: '12', month: 'Fev' } },
]);

definePageMeta({
	middleware: process.client ? ['auth-user'] : undefined
});
</script>

<style>
#carousel-next-prizes .carousel__pagination-button::after {
	/* Your custom styles here */
	width: 25px;
	border-radius: 15px;
	height: 6px;
	background-color: v-bind(bgCarouselPagination);
	opacity: .3;
}

#carousel-next-prizes .carousel__pagination-button--active::after {
	/* Your custom styles here */
	background-color: v-bind(bgCarouselPaginationActive);
	opacity: 1;
}
</style>
