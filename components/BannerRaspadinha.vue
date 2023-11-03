<template>
	<div
		class="relative box-content md:box-border min-h-auto md:h-[210px] p-2 md:p-4 flex justify-between bg-no-repeat bg-right md:bg-center bg-cover rounded-3xl bg-[url('/imgs/gol.png')]">
		<div class="flex w-full text-white">
			<div class="w-1/2 flex justify-end">
				<div class="relative w-full">
					<img src="/imgs/raspadinha_bola_movimento.png" class="w-[60px] md:w-[160px] h-auto scale-125" />
				</div>
			</div>
			<div class="w-1/2 flex flex-col justify-between">
				<!-- QTD RASP. -->
				<div class="flex justify-end">
					<div class="flex flex-col items-end">
						<div class="flex">
							<p class="date text-[10px] md:text-[24px] mr-2">03</p>
							<img src="/imgs/image_rasp.png" class="w-[30px] md:w-[64px]" />
						</div>
						<div>
							<p class="rabiscadinha uppercase text-[6px] md:text-[12px]">rabiscadinhas</p>
						</div>
					</div>
				</div>
				<!-- TEXTO -->
				<div class="flex">
					<div class="justify-start">
						<p class="uppercase text-central text-[10px] md:text-[16px] ">ESTÁ COM SORTE?</p>
						<p class="text text-[10px] md:text-[14px]">Você tem rabiscadinhas!</p>
					</div>
				</div>
				<!-- BOTÃO -->
				<NuxtLink to="/app/gamification">
					<div class="flex justify-end items-center">
						<p class="uppercase rabiscar text-[10px] md:text-[14px]">rabiscar agora</p>
						<UIcon class="seta" name="i-material-symbols-arrow-forward-ios" />
					</div>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.seta {
	background-color: #847248;
	font-size: 150%;
}

.text-central,
.rabiscar {
	font-family: 'Gotham Black';
}

.text,
.rabiscadinha,
.date {
	font-family: 'Gotham Medium';
}
</style>
