<template>
	<div v-if="store.loading"
		class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center min-h-screen bg-slate-950 bg-no-repeat bg-center bg-cover bg-[url('/imgs/img_fundo_loading.png')]">
		<img src="/imgs/img_loading.png" class="mb-24 w-60 md:w-auto" />
		<div class="text-white">
			<div class="flex flex-col justify-center items-center mb-28">
				<div class="simple-spinner">
					<span></span>
				</div>
				<div class="mt-5 uppercase font-semibold">
					<h2>Carregando...</h2>
				</div>
			</div>
		</div>
		<img src="/imgs/img_fiel_da_sorte.png" />
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

</script>

<style scoped>
.simple-spinner {
	position: relative;
	display: block;
	width: 30px;
	height: 30px;
}

.simple-spinner span {
	display: block;
	width: 30px;
	height: 30px;
	border: 3px solid transparent;
	border-radius: 50%;
	border-right-color: rgba(255, 255, 255, 0.7);
	animation: spinner-anim 0.8s linear infinite;
}

@keyframes spinner-anim {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>
