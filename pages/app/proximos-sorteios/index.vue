<template>
	<div>
		<BackgroundDefault />
		<UContainer>
			<BannerCard class="mt-20" titulo="20 DE NOVEMBRO, 2023" subtitulo="Bola de partida oficial autografada"
				validade="Números válidos até 21/11/2023" :imagemSrc="('/imgs/exemplo_premio_03.png')" />
			<CampoPesquisa class="mt-6" />
			<InfoCard v-for="card in cards" class="mt-8" :titulo="card.titulo" :subtitulo="card.subtitulo"
				:customBackground="card.hasBg" :imagemSrc="card.img" :source="card.source" :date="card.date" />
		</UContainer>
	</div>
</template>

<script setup>
let cards = ref([
	{ titulo: 'Camisa de jogo autografada', subtitulo: 'Você foi o sorteado!', source: '/detalhes-premios', hasBg: true, img: '/imgs/premio_02.png', date: { day: '24', month: 'Jun' } },
	{ titulo: 'Luva do cassio autografada', subtitulo: '', source: '/detalhes-premios', hasBg: false, img: '/imgs/exemplo_premio_luva.png', date: { day: '12', month: 'Fev' } },
]);
</script>

<style scoped>
.card {
	background-color: black;
}
</style>
