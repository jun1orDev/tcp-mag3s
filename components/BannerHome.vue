<template>
	<div>
		<div
			class="relative card box-content md:box-border min-h-[100px] md:h-[210px] p-4 md:p-8 flex justify-between bg-no-repeat bg-right md:bg-center bg-cover rounded-3xl bg-[url('/imgs/card_sorteio_atual_mobile.png')]"
		>
			<div class="flex justify-between text-slate-100">
				<div class="">
					<img
						src="/imgs/Mosqueteiro_tablet.png"
						class="w-[62px] md:w-[98px] h-auto absolute -bottom-1 left-5 scale-110"
					/>
				</div>
				<div class="px-24 md:px-[98px]">
					<p class="title text-[12px] md:text-[24px]">FIQUE ATENTO!</p>
					<p class="subtitle text-[10px] md:text-[16px]">
						Acompanhe a contagem <br>
						regressiva pro sorteio de
						hoje e boa sorte!
					</p>
					<div class="flex items-center">
						<p class="time text-[16px] md:text-[24px]">02h21m47s</p>
					</div>
				</div>
			</div>

			<div
				class="absolute scale-110 -bottom-3 right-4 md:right-10 py-4 "
			>
				<img src="/imgs/exemplo_premio_01.png" class=" w-[115px] md:w-[200px]"/>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['titulo', 'subtitulo', 'time', 'imagemSrc']);
</script>

<style scoped>
.title, .time{
	font-family: 'Gotham Black';
}

.subtitle{
	font-family: 'Gotham Medium';
}
</style>
