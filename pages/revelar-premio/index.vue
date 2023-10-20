<template>
	<div v-if="false">
		<PlanoFundo />
		<UContainer>
			<BannerCard
				class="mt-16"
				titulo="21 DE NOVEMBRO, 2023"
				subtitulo="Luva autografada do Cassio"
				validade="Números válidos até 21/11/2023"
				:imagemSrc="'/imgs/exemplo_premio_01.png'"
			/>
			<div class="button-container mt-10">
				<NumeroSorteio
					v-for="list in buttons"
					class="button"
					:button="list.button"
					:customBackground="list.color"
				/>
			</div>
		</UContainer>
		<ResultDraw
			titulo="BOA SORTE!"
			subtitulo="Se a combonação dos números sorteados bater com algum dos seus números, você ganhou!"
			button="REVELAR RESULTADO"
		/>
	</div>

	<!-- simulação da página em que o usuáro NÃO GANHOU o sorteio -->

	<div v-if="true">
		<PlanoFundo />
		<UContainer>
			<BannerCard
				class="mt-16"
				titulo="21 DE NOVEMBRO, 2023"
				subtitulo="Luva autografada do Cassio"
				validade="Números válidos até 21/11/2023"
				:imagemSrc="'/imgs/exemplo_premio_01.png'"
			/>
			<div>
				<p class="premio text-white mt-6 text-[10px] md:text-[14px]">
					Número premiado de hoje:
				</p>
			</div>
			<div class="button-container mt-2">
				<NumeroSorteio
					v-for="list in negativeButtons"
					class="button"
					:button="list.button"
					:customBackground="list.color"
				/>
			</div>
		</UContainer>
		<ResultDraw
			titulo="NÃO FOI DESSA VEZ..."
			subtitulo="Continua atento aos sorteios, aqui no Fiel da Sorte todo dia tem ganhador!"
			button="VOLTAR"
		/>
	</div>

	<!-- simulação da página que GANHOU o sorteio  -->

	<div v-if="false">
		<PlanoFundo />
		<UContainer>
			<BannerCard
				class="mt-16"
				titulo="21 DE NOVEMBRO, 2023"
				color="#DFA701"
				subtitulo="Luva autografada do Cassio"
				validade="Números válidos até 21/11/2023"
				:imagemSrc="'/imgs/exemplo_premio_01.png'"
			/>
			<div>
				<p class="premio text-white mt-6 text-[10px] md:text-[14px]">
					Número premiado de hoje:
				</p>
			</div>
			<div class="button-container mt-2">
				<NumeroSorteio
					v-for="list in positiveButtons"
					class="button"
					:button="list.button"
					:customBackground="list.color"
				/>
			</div>
		</UContainer>
		<ResultDraw
			titulo="PARABÉNS!"
			subtitulo="Seu número da sorte foi contemplado! Lembre-se: Mantenha seu cadastro atualizado que nossa equipe vai entrar em contato em breve!"
			button="VER DETALHES"
		/>
	</div>
</template>

<script setup>
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
	width: calc(
		14.28% - 10px
	); /* Largura dos botões com espaço horizontal de 10px */
	height: 40px; /* Altura dos botões */
	margin: 10px 5px; /* Espaçamento vertical de 10px e espaçamento horizontal de 5px */
	border: 1px solid #847248;
}

/* Estilos responsivos para tablets*/
@media (min-width: 768px) {
	.button {
		flex-basis: calc(
			14.28% - 20px
		); /* Largura dos botões com espaço horizontal de 20px */
		height: 50px; /* Altura dos botões para tablets */
		margin: 10px 10px;
	}
}
</style>
