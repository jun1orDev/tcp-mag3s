<template>
	<div class="relative">
		<div class="campo relative">
			<UTextarea class="texto" color="yellow" variant="outline" :rows="3" />
			<img
				src="/imgs/premio_02.png"
				class="absolute scale-2 top-0 left-0 object-cover z-30 -mt-4"
			/>
		</div>
		<div class="text-amber-50 z-10 absolute top-0 left-0">
			<div>
				<p class="ml-28 mb-1 mt-4 text-xs md:text-sm texto-principal">
					CAMISA DE JOGO AUTOGRAFADA
				</p>
				<p class="ml-28 -mt-1 text-[10px] md:text-sm sub">
					Você foi o sorteado!
				</p>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.campo {
	background: linear-gradient(
		to right,
		rgba(253, 253, 57, 0.5),
		rgba(0, 0, 0, 0.5)
	);
	border-radius: 5px;
}
.texto {
	font-family: 'Gotham Black';
}
.texto-principal {
	font-family: 'Gotham Black';
}
.sub {
	font-family: 'Gotham Medium';
}
</style>
