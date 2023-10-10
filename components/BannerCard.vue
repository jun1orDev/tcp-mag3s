<template>
	<div>
		<div
			class="relative card box-content md:box-border min-h-[100px] md:h-[210px] p-4 md:p-8 flex justify-between bg-no-repeat bg-right md:bg-center bg-cover rounded-3xl bg-[url('/imgs/card_sorteio_atual_mobile.png')]">

			<div class="flex flex-col justify-between text-slate-100">
				<div>
					<p class="text-xs md:text-base">
						<span class="text-slate-200">{{ props.titulo }}</span>
					</p>
					<p class="subtitulo text-[10px] md:text-sm ">
						<span class="text-slate-200">{{ props.subtitulo }}</span>
					</p>
					<div class="flex items-center mt-4 text-[10px] md:text-[14px] ">
						<p>
							<span class="text-slate-200">{{ props.revelar }}</span>
						</p>&nbsp;
						<UIcon v-if="props.revelar" class="seta" name="i-material-symbols-arrow-forward-ios" />
					</div>
				</div>

				<div>
					<h6 class="text-[8px] md:text-[10px]">
						<span class="text-slate-200">{{ props.validade }}</span>
					</h6>
				</div>

			</div>

			<div class="absolute scale-110 -bottom-3 right-5 md:right-10 w-[160px] md:w-[250px]">
				<img :src="props.imagemSrc" />
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['titulo', 'subtitulo', 'revelar', 'validade', 'imagemSrc']);
</script>

<style scoped>
p {
	font-family: 'Gotham Black';
}

.subtitulo,
.validate,
h6 {
	font-family: 'Gotham Medium';
}

.seta {
	background-color: #847248;
	font-size: 150%;
}
</style>
