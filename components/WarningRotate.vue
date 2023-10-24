<template>
	<div class="lg:hidden">
		<!-- plano de fundo -->
		<div class="image relative">
			<div class="flex flex-col justify-center items-center min-h-screen bg-no-repeat bg-center bg-cover"
				style="background-image: url('/imgs/game.png')"></div>
		</div>

		<!-- texto central  -->
		<div
			class="texto text-center justify-start absolute flex top-0 left-0 right-0 bottom-0 text-[14px] md:text-[20px] mt-16 flex-col">
			<p class="text-white mb-2">
				GIRE A TELA DO SEU CELULAR ATÉ <br />
				ELE FICAR DEITADO, OK?
			</p>
			<p class="text-white">
				ASSIM VOCÊ APROVEITA MELHOR SUA <br />
				RABISCADINHA.
			</p>
			<Line />
		</div>

		<!-- imagem mosqueteiro -->
		<div>
			<img src="/imgs/mosqueteiro_triste.png" class="absolute inset-0 m-auto z-10" style="width: 220px; height: 250px" />
		</div>

		<!-- imagem de sinalização de rotação -->
		<div class="flex items-center">
			<img src="/imgs/rotate_screen.png" class="absolute inset-0 m-auto z-10 mb-20"
				style="width: 100px; height: 100px" />
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.image {
	filter: brightness(10%);
}

.texto {
	font-family: 'Gotham Black';
}
</style>
