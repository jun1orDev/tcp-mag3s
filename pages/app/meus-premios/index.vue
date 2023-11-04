<template>
	<div class="mt-10">
		<BackgroundDefault />
		<UContainer>
			<BannerCard
				class="mt-20"
				titulo="20 DE NOVEMBRO, 2023"
				subtitulo="Bola de partida oficial autografada"
				revelar="Revelar Prêmio"
				validade="Números válidos até 21/11/2023"
				:imagemSrc="'/imgs/exemplo_premio_03.png'"
			/>
			<div class="button flex items-center">
				<div
					v-bind:class="{
						'bg-[#847248]': botaoClicado === 0,
						'bg-black': botaoClicado !== 0,
					}"
					class="flex justify-center items-center border text-[#FFF] border-[#847248] mt-6 w-full h-8 rounded-s-lg border-e-0 text-[10px] md:text-sm cursor-pointer hover.bg-[#847248] focus:ring"
					@click="handleClick(0)"
				>
					<p>apenas rabiscadinhas</p>
				</div>
				<div
					v-bind:class="{
						'bg-[#847248]': botaoClicado === 1,
						'bg-black': botaoClicado !== 1,
					}"
					class="buttons flex justify-center items-center border text-[#FFF] border-[#847248] mt-6 w-full h-8 rounded-e-lg text-[10px] md:text-sm cursor-pointer focus:outline-none hover.bg-[#847248] focus:ring"
					@click="handleClick(1)"
				>
					<p>apenas sorteios</p>
				</div>
			</div>
			<InfoCard
				v-for="card in cards"
				class="mt-8"
				:titulo="card.titulo"
				:subtitulo="card.subtitulo"
				:customBackground="card.hasBg"
				:imagemSrc="card.img"
				:source="card.source"
				:date="card.date"
				:imgCard="card.imgCard"
			/>
		</UContainer>
	</div>
</template>

<script setup>
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

console.log(botaoClicado);

const handleClick = (index) => {
	botaoClicado.value = index;
};
</script>

<style scoped>
.button {
	font-family: 'Gotham Medium';
}
</style>
