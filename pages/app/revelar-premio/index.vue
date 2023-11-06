<template>
	<div class="py-12">
		<BackgroundDefault />

		<UContainer>
			<!-- Banner Principal -->
			<BannerCard linkSource="" :hasImageDetach="false" imageDetach="" title="21 DE NOVEMBRO, 2023"
				subtitle="Luva autografada do Cassio" :countdown="false" :callToAction="false"
				description="Números válidos até 21/11/2023" imageAward="https://imagedaapi.com" />

			<div class="button-container mt-10">
				<NumeroSorteio v-for="list in buttons" class="button" :button="list.button" :customBackground="list.color" />
			</div>

			<div class="button-container mt-10">
				<NumeroSorteio v-for="list in buttons" class="button" :button="list.button" :customBackground="list.color" />
			</div>
		</UContainer>

		<!-- Modal de interação do prêmio -->
		<ModalPrize />
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

let buttons = ref([
	{ button: '01', color: 'black' },
	{ button: '02', color: 'black' },
	{ button: '03', color: 'black' },
	{ button: '04', color: 'black' },
	{ button: '05', color: 'black' },
	{ button: '06', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '08', color: 'black' },
	{ button: '09', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
]);

let negativeButtons = ref([
	{ button: '01', color: '#DFA701' },
	{ button: '07', color: '#DFA701' },
	{ button: '03', color: '#DFA701' },
	{ button: '04', color: '#DFA701' },
	{ button: '09', color: '#DFA701' },
	{ button: '06', color: '#DFA701' },
	{ button: '08', color: '#DFA701' },
	{ button: '09', color: '#847248' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: '#847248' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
]);

let positiveButtons = ref([
	{ button: '01', color: '#DFA701' },
	{ button: '02', color: '#DFA701' },
	{ button: '03', color: '#DFA701' },
	{ button: '04', color: '#DFA701' },
	{ button: '05', color: '#DFA701' },
	{ button: '06', color: '#DFA701' },
	{ button: '07', color: '#DFA701' },
	{ button: '08', color: 'black' },
	{ button: '09', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
	{ button: '07', color: 'black' },
]);

onMounted(() => {
	store.openModalPrizeResult(
		store.contentApp.modal_text_prize_title_one,
		store.contentApp.modal_text_prize_subtitle_one,
		store.contentApp.modal_text_prize_label_one,
		'');
})

</script>

<style scoped>
.premio {
	font-family: 'Gotham Medium';
}

.button-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.button {
	width: calc(14.28% - 10px);
	/* Largura dos botões com espaço horizontal de 10px */
	height: 40px;
	/* Altura dos botões */
	margin: 10px 5px;
	/* Espaçamento vertical de 10px e espaçamento horizontal de 5px */
	border: 1px solid #847248;
}

/* Estilos responsivos para tablets*/
@media (min-width: 768px) {
	.button {
		flex-basis: calc(14.28% - 20px);
		/* Largura dos botões com espaço horizontal de 20px */
		height: 50px;
		/* Altura dos botões para tablets */
		margin: 10px 10px;
	}
}

.horizontal-line {
	background-color: #dfa701;
	/* Cor da linha vertical (preto, neste exemplo) */
}
</style>
