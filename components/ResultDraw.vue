<template>
	<div class="flex">
		<div
			class="p-7 justify-end fixed bottom-0 left-0 right-0 flex bg-cover bg-[url('/imgs/card_sorteio_atual_mobile.png')] bg-stone-950/90"
		>
			<div class="flex flex-col justify-center items-center ">
				<h1
					class="titulo text-white"
					:style="`background-color: ${props.customBackground}`"
				>
					{{ props.titulo }}
				</h1>
				<div
					class="subtitulo text-justify text-white text-[10px] md:text-[14px] mb-5"
				>
					{{ props.subtitulo }}
				</div>
				<button
					v-if="props.mostrarBotao"
					@click="revelarResultado"
					class="button px-5 py-2 bg-[#847248] text-white text-[10px] md:text-[12px] rounded-xl mt-3"
				>
					{{ props.button }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const isOpen = ref(false);
const props = defineProps([
	'titulo',
	'subtitulo',
	'button',
	'customBackground',
	'mostrarBotao',
]);

function revelarResultado() {
	isOpen.value = true;
}
</script>

<style scoped></style>
