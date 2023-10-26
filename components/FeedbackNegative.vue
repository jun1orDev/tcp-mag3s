<template>
	<div class="fixed top-0 right-0 left-0 bottom-0 min-h-screen bg-stone-950/90">
		<div class="flex justify-start items-center px-8 h-screen">
			<div class="flex items-start py-8">
				<!-- MOSQUETEIRO  -->
				<div class="block">
					<img
						src="/imgs/Mosqueteiro_tablet.png"
						class="block w-auto h-screen max-h-[700px] py-8"
					/>
				</div>
				<div class="flex items-center pt-8">
					<div class="flex items-center">
						<Line
							largura="w-32 lg:w-44 rotate-90 ml-7"
							diagonal="w-10 transform -rotate-45 mb-6 "
						/>
					</div>
					<!-- TEXTO AO LADO DA LINHA -->
					<div class="flex">
						<div class="justify-start ml-4 mb-4">
							<p
								class="title text-[#847248] text-[20px] md:text-[36px] whitespace-nowrap"
							>
								FOI POR POUCO!
							</p>
							<p class="subtitle text-[10px] lg:text-[16px] text-white">
								Continue tentando, os prêmios não param!<br /><br />
							</p>

							<p class="subtitle2 text-[10px] lg:text-[16px] text-white">
								No Fiel da Sorte você concorre a milhares de <br />
								prêmios instantâneos toda semana e nos super <br />
								sorteios com seus números da sorte!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- MOSQUETEIRO E BOTÃO -->
		<div class="fixed bottom-8 right-8 flex items-center">
			<div class="w-[54px] lg:w-[89px] mr-3">
				<img src="/imgs/Mosqueteiro_Feliz.png" />
			</div>
			<div class="">
				<button
					@click="fecharConteudo"
					class="button px-5 py-3 bg-[#847248] text-white text-[10px] md:text-[12px] rounded-xl"
				>
					RABISCAR NOVAMENTE
					<UBadge
						:ui="{
							rounded: 'rounded-full',
							variant: { outline: 'ring-white' },
						}"
						:label="restScratchCard"
						variant="outline"
						color="white"
					/>
				</button>
			</div>
		</div>

		<!-- BOTÃO FECHAR -->
		<div class="absolute top-8 right-8 items-center text-[#847248] text-[40px]">
			<UIcon
				name="i-material-symbols-cancel-outline"
				@click="fecharConteudoRasp"
			/>
		</div>
	</div>
</template>

<script setup>
const restScratchCard = ref(3);
const isClosed = ref(false);

const fecharConteudo = () => {
	isClosed.value = true;
};

const fecharConteudoRasp = () => {
	isClosed.value = true;
};
</script>

<style scoped>
.title,
.button {
	font-family: 'Gotham Black';
}
.subtitle,
.subtitle2 {
	font-family: 'Gotham Medium';
}
</style>
