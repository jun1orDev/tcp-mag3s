<template>
	<div>
		<!-- MOSQUETEIRO E BOTÃO -->
		<div class="fixed bottom-4 right-6 flex items-center">
			<div class="w-[52px] lg:w-[89px] mr-3">
				<img src="/imgs/Mosqueteiro_Feliz.png" />
			</div>
			<div class="button">
				<button
					@click="fecharConteudo"
					class="button px-5 py-2 bg-[#847248] text-white text-[10px] md:text-[12px] rounded-xl"
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
	</div>
</template>

<script setup>
const restScratchCard = ref(6);
</script>

<style scoped>
.button {
	font-family: 'Gotham Black';
}
</style>
