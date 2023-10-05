<template>
	<div>
		<PlanoFundo />

		<UContainer>
			<BannerCard
				class="mt-20"
				titulo="20 DE NOVEMBRO, 2023"
				subtitulo="Bola de partida oficial autografada"
				revelar="REVELAR PRÊMIO"
				validade="Números válidos até 21/11/2023"
				:imagemSrc="('/imgs/exemplo_premio_03.png')"
			/>
			<CampoPesquisa class="mt-6" />
			<InfoCard
				class="mt-6"
				titulo="CAMISA DE JOGO AUTOGRAFADA"
				subtitulo="Você foi o sorteado!"
				:customBackground="{
					background:
						'linear-gradient(to right, rgba(253, 253, 57, 0.5), rgba(0, 0, 0, 0.5)',
					borderRadius: '5px',
				}"
				:imagemSrc="('/imgs/premio_02.png')"
			/>
			<InfoCard
				class="mt-6 text-center"
				titulo="LUVA AUTOGRAFADA DO CASSIO"
				:customBackground="{
					background: 'black',
					borderRadius: '10px',
				}"
				:imagemSrc="('/imgs/exemplo_premio_luva.png')"
			/>
		</UContainer>
	</div>
</template>

<script setup></script>

<style scoped></style>
