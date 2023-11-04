<template>
	<div v-if="store.contentHasBeenLoaded">
		<div class="w-full relative grid grid-flow-col auto-cols-auto px-4">
			<!-- Background -->
			<div :style="background"
				class="absolute -translate-y-[50%] top-[50%] right-0 left-0 min-h-[110px] sm:h-[200px] md:h-[215px] bg-no-repeat bg-right md:bg-center bg-cover rounded-3xl -z-10">
			</div>

			<!-- Lado Esquerdo -->
			<div class="grid grid-flow-col auto-cols-auto justify-start items-center col-span-2">

				<!-- Imagem de destaque -->
				<div v-if="hasImageDetach" class="w-[60px] w-min-[60px] sm:w-[110px] me-5">
					<img :src="image" onerror="this.src='/imgs/Mosqueteiro_tablet.png'" />
				</div>

				<!-- Conteúdo de texto -->
				<div class="flex flex-col justify-start py-2">
					<div :style="`color: ${store.contentApp.colors_text_one}`">

						<div>
							<!-- Título -->
							<p class="text-[12px] sm:text-[18px] md:text-2xl uppercase">
								{{ props.title }}
							</p>

							<!-- Subtítulo -->
							<p class="text-[10px] sm:text-[16px] md:text-xl leading-[0.8rem] sm:leading-5 subtitulo">
								{{ props.subtitle }}
							</p>

							<!-- Contagem Regressiva -->
							<div v-if="props.countdown" class="mt-1 text-[16px] sm:text-[28px] md:text-[34px] font-bold">
								<!-- <p> {{ props.countdown }} </p> -->
								<h1>{{ countDW }}</h1>
							</div>
						</div>

						<!-- Call to action -->
						<div v-if="props.callToAction" class="flex items-center mt-4 text-[10px] md:text-[14px]">
							<p>
								{{ props.callToAction }}
							</p>&nbsp;
							<UIcon v-if="props.callToAction" class="seta" name="i-material-symbols-arrow-forward-ios" />
						</div>
					</div>

					<div>
						<h6 class="text-[8px] md:text-[10px]">
							<span class="text-slate-200">{{ props.validade }}</span>
						</h6>
					</div>
				</div>
			</div>

			<!-- Lado Direito -->
			<div class="w-[110px] w-min-[110px] sm:w-[220px] col-span-1 flex items-center justify-end">
				<img :src="props.imageAward" onerror="this.src='/imgs/exemplo_premio_03.png'" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const { $countdown } = useNuxtApp();

const props = defineProps(['title', 'subtitle', 'countdown', 'callToAction', 'validade', 'imageAward', 'hasImageDetach']);

const background = computed(() => {
	return `background-image:url('${pathAssets}${store.contentApp.banner_background_card_one}'), url('/imgs/card_sorteio_atual_mobile.png')`;
});

const image = computed(() => {
	return `${pathAssets}${store.contentApp.banner_image_card_one}`;
});

let countDW = ref('');

setInterval(() => {
	countDW.value = $countdown(props.countdown);
}, 1000);

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
