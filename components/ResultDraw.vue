<template>
	<div style="display: flex; flex-direction: column; justify-content: flex-end">
		<div
			class="card p-4 md:p-8 fixed bottom-0 left-0 right-0 flex justify-center bg-no-repeat bg-right md:bg-center bg-cover bg-[url('/imgs/card_sorteio_atual_mobile.png')]"
		>
			<div class="flex flex-col justify-center items-center">
				<div>
					<h1 :style="`background-color: ${props.customBackground}`">
						<span>{{ props.titulo }}</span>
					</h1>
				</div>
				<div
					class="subtitulo text-center text-white text-[10px] md:text-[14px]"
				>
					<span>{{ props.subtitulo }}</span>
				</div>
				<button
					class="button mt-3 cursor-pointer w-44 h-8 bg-[#847248] text-white text-xs font-semibold rounded-xl"
					@click="revelarResultado"
				>
					<span>{{ props.button }}</span>
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
]);

function revelarResultado() {
	isOpen.value = true;
}
</script>

<style scoped>
.subtitulo {
	font-family: 'Gotham Medium';
}
.button {
	font-family: 'Gotham black';
}
</style>
