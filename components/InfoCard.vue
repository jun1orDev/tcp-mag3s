<template>
	<NuxtLink :to="props.source" class="relative w-full flex justify-between border border-amber-400 rounded-xl" :class="props.customBackground ? 'gradiente': 'bg-black'">
		<div class="flex items-center text-white">
			<!-- imagem -->
			<div class="mx-5">
				<img :src="props.imagemSrc" class="scale-150 top-0 left-0 object-cover w-[98px]" />
			</div>

			<!-- Data -->
			<div v-if="props.date" class="text-center me-5">
				<p class="number-data text-[26px] text-md-[30px] leading-5 md:leading-6">{{props.date.day}}</p>
				<p class="uppercase text-base">{{props.date.month}}</p>
			</div>

			<!-- Image -->
			<div v-else class="items-center justify-center ">
				<img :src="props.imgCard" class="mr-4">
			</div>

			<!-- Titulo e subtítulo -->
			<div>
				<div>
					<p class="text-xs md:text-sm texto-principal leading-3 md:leading-normal uppercase ">
						<span>{{ props.titulo }}</span>
					</p>
					<p class="text-[10px] md:text-sm sub leading-3 md:leading-normal ">
						<span>{{ props.subtitulo }}</span>
					</p>
				</div>
			</div>
		</div>

		<!-- Botão -->
		<div class="text-white flex items-center text-xl md:text-3xl rounded-e-xl" style="background-color: #827248;">
			<UIcon class="mx-1" name="i-material-symbols-arrow-forward-ios" />
		</div>
	</NuxtLink>
</template>

<script setup>
const props = defineProps(['titulo', 'subtitulo', 'imagemSrc', 'source', 'customBackground', 'date', 'imgCard']);
</script>

<style scoped>
.texto-principal,
.texto,
.number-data {
	font-family: 'Gotham Black';
}

.sub {
	font-family: 'Gotham Medium';
}

.gradiente {
	background: linear-gradient(90deg, #DFA701 -15.84%, rgba(0, 0, 0, 0.70) 77.28%);
}
</style>
