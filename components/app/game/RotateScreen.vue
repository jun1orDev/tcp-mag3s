<template>
	<div class="lg:hidden fixed top-0 left-0 right-0 bottom-0 z-50" :style="bgColor">
		<!-- texto central  -->
		<div
			class="fm3 text-center justify-start absolute flex top-0 left-0 right-0 bottom-0 text-[14px] md:text-[20px] mt-16 flex-col">
			<p class="text-white mb-2">
				GIRE A TELA DO SEU CELULAR ATÉ <br />
				ELE FICAR DEITADO, OK?
			</p>
			<p class="text-white">
				ASSIM VOCÊ APROVEITA MELHOR SUA <br />
				RABISCADINHA.
			</p>
			<AppOthersLine />
		</div>

		<!-- imagem mosqueteiro -->
		<div>
			<img src="/imgs/mosqueteiro_triste.png" class="absolute inset-0 m-auto z-10 w-[150px] md:w-[220px]"/>
		</div>

		<!-- imagem de sinalização de rotação -->
		<div class="flex items-center">
			<img src="/imgs/rotate_screen.png" class="absolute inset-0 m-auto z-10 mb-20 w-[70px] h-[70px] md:w-[100px] md:h-[100px] animate__animated animate__rotateIn animate__delay-2s animate__infinite infinite" />
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';

const store = useStoreApp();

const bgColor = computed(() => {
	return `background: ${store.contentApp.colors_background_one}DF`
});
</script>

<style scoped></style>
