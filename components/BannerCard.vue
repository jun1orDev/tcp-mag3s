<template>
	<NuxtLink :to="props.linkSource" v-if="store.contentHasBeenLoaded"
		class="w-full relative grid grid-flow-col auto-cols-auto justify-between px-4 sm:px-6 md:px-8">
		<!-- Background -->
		<div :style="background"
			class="absolute -translate-y-[50%] top-[50%] right-0 left-0 min-h-[110px] sm:h-[200px] md:h-[215px] bg-no-repeat bg-right md:bg-center bg-cover rounded-3xl -z-10 animate__animated animate__fadeIn">
		</div>

		<!-- Lado Esquerdo -->
		<div class="grid grid-flow-col auto-cols-auto justify-start items-center col-span-2">

			<!-- Imagem de destaque -->
			<div v-if="props.hasImageDetach" class="w-[60px] sm:w-[110px] me-5">
				<img :src="imageDT" onerror="this.src='/imgs/Mosqueteiro_tablet.png'" />
			</div>

			<!-- Conteúdo de texto -->
			<div :style="`color: ${store.contentApp.colors_text_one}`" class="flex flex-col h-full py-6 sm:py-12 md:py-14"
				:class="props.description ? 'justify-between' : 'justify-center'">

				<div class="text-start">
					<!-- Título -->
					<p class="text-[12px] sm:text-[18px] md:text-2xl uppercase animate__animated animate__fadeInDown">
						{{ props.title }}
					</p>

					<!-- Subtítulo -->
					<p class="text-[10px] sm:text-[16px] md:text-xl leading-[0.8rem] sm:leading-5 subtitulo animate__animated animate__fadeInUp">
						{{ props.subtitle }}
					</p>

					<!-- Contagem Regressiva -->
					<div v-if="props.countdown" class="mt-1 text-[16px] sm:text-[28px] md:text-[34px] font-bold">
						<h1 v-if="countDW" class="animate__animated animate__fadeIn">{{ countDW }}</h1>
						<div v-else class="mt-3">
							<USkeleton class="h-2 w-[60px] sm:h-3 sm:w-[110px] md:h-4 md:w-[130px]" />
							<USkeleton class="mt-1 h-2 w-[80px] sm:mt-3 sm:h-3 sm:w-[160px] md:h-4 md:w-[190px]" />
						</div>
					</div>
				</div>

				<!-- Call to action -->
				<div v-if="props.callToAction"
					class="flex items-center mt-4 text-[10px] sm:text-[12px] md:text-[14px] uppercase tracking-wider">
					<p class="me-2"> {{ props.callToAction }} </p>
					<UIcon v-if="props.callToAction" class="seta" name="i-material-symbols-arrow-forward-ios" />
				</div>

				<!-- Description -->
				<div v-if="props.description">
					<h6 class="text-[10px] sm:text-[12px] text-start">
						<span class="text-slate-200">{{ props.description }}</span>
					</h6>
				</div>
			</div>
		</div>

		<!-- Lado Direito -->
		<div class="w-[115px] sm:w-[220px] md:w-[240px] col-span-1 flex items-center justify-end">
			<img :src="props.imageAward" onerror="this.src='/imgs/exemplo_premio_01.png'"
				class="animate__animated animate__tada" />
		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const { $countdown } = useNuxtApp();

const props = defineProps(['linkSource', 'title', 'subtitle', 'countdown', 'callToAction', 'description', 'imageAward', 'imageDetach', 'hasImageDetach']);

const background = computed(() => {
	return `background-image:url('${pathAssets}${store.contentApp.banner_background_card_one}'), url('/imgs/card_sorteio_atual_mobile.png')`;
});

const imageDT = computed(() => {
	return `${pathAssets}${props.imageDetach}`;
});

let countDW = ref(null);

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
