<template>
	<div class="campo relative">
		<div>
			<UTextarea
				class="texto"
				color="yellow"
				variant="outline"
				:rows="3"
				disabled
			/>
			<img
				:src="props.imagemSrc"
				class="absolute scale-2 top-0 left-0 object-cover z-30 -mt-4"
			/>
			<span>{{ props.cardFundo }}</span>
		</div>
		<div class="text-amber-50 z-10 absolute top-0 left-0">
			<div>
				<p class="ml-28 mb-1 mt-4 text-xs md:text-sm texto-principal">
					<span class="text-slate-200">{{ props.titulo }}</span>
				</p>
				<p class="ml-28 -mt-1 text-[10px] md:text-sm sub">
					<span class="text-slate-200">{{ props.subtitulo }}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['titulo', 'subtitulo', 'cardFundo', 'imagemSrc']);
</script>

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
