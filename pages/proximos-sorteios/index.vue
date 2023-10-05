<template>
	<div>
		<PlanoFundo />
		<UContainer>
			<BannerCard
				class="mt-20"
				titulo="20 DE NOVEMBRO, 2023"
				subtitulo="Bola de partida oficial autografada"
				validade="Números válidos até 21/11/2023"
				:imagemSrc="('/imgs/exemplo_premio_03.png')"
			/>
			<CampoPesquisa class="mt-6" />
			<InfoCard
				class="mt-7"
				titulo="CAMISA DE JOGO AUTOGRAFADA"
				:cardFundo="card"
				:imagemSrc="('/imgs/premio_02.png')"
			/>
			<InfoCard
				class="mt-7"
				titulo="LUVA AUTOGRAFADA DO CASSIO"
				:cardFundo="card"
				:imagemSrc="('/imgs/exemplo_premio_luva.png')"
			/>
		</UContainer>
	</div>
</template>

<script setup></script>
<style scoped>
.card{
	background-color: black;
}
</style>
