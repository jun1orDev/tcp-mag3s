<template>
	<NuxtLink :to="props.linkSource" v-if="store.contentHasBeenLoaded"
		class="w-full relative grid grid-flow-col auto-cols-auto justify-between px-4 sm:px-6 md:px-8">
		<!-- Background -->
		<div :style="background"
			class="absolute -translate-y-[50%] top-[50%] right-0 left-0 min-h-[110px] sm:h-[200px] md:h-[215px] lg:h-[180px] bg-no-repeat bg-right md:bg-center bg-cover rounded-lg md:rounded-3xl -z-10 animate__animated animate__fadeIn">
		</div>

		<!-- Lado Esquerdo -->
		<div class="grid grid-flow-col auto-cols-auto justify-start items-center col-span-2">

			<!-- Imagem de destaque -->
			<div v-if="props.hasImageDetach" class="w-[60px] sm:w-[110px] lg:w-[90px] me-5">
				<img :src="imageDT" onerror="this.src='/imgs/Mosqueteiro_tablet.png'" />
			</div>

			<!-- Conteúdo de texto -->
			<div :style="`color: ${store.contentApp.colors_text_one}`" class="flex flex-col h-full py-6 sm:py-12 md:py-14"
				:class="props.description ? 'justify-between' : 'justify-center'">

				<div class="text-start">
					<!-- Título -->
					<h1 class="fm3 text-[12px] sm:text-[18px] md:text-[22px] lg:text-[19px] uppercase animate__animated animate__fadeInDown">
						{{ props.title }}
					</h1>

					<!-- Subtítulo -->
					<p
						class="fm1 text-[9px] sm:text-[16px] md:text-lg lg:text-base leading-[0.8rem] sm:leading-5 lg:leading-tight animate__animated animate__fadeInUp">
						{{ props.subtitle }}
					</p>

					<!-- Contagem Regressiva -->
					<div v-if="props.countdown" class="mt-1 text-[16px] sm:text-[28px] md:text-[34px] lg:text-[26px] font-bold">
						<h1 v-if="countDW" class="animate__animated animate__fadeIn">{{ countDW }}</h1>
						<Spin v-else class="mt-3 animate__animated animate__zoomIn"/>
					</div>
				</div>

				<!-- Call to action -->
				<div v-if="props.callToAction"
					class="fm3 flex items-center mt-4 text-[10px] sm:text-[12px] md:text-[14px] uppercase tracking-wider">
					<p> {{ props.callToAction }} </p>
					<UIcon v-if="props.callToAction" class="arrow ms-1 text-2xl" name="i-material-symbols-arrow-forward-ios" />
				</div>

				<!-- Description -->
				<div v-if="props.description">
					<p class="fm1 text-[8px] sm:text-[10px] lg:text-[12px] text-start">
						{{ props.description }}
					</p>
				</div>
			</div>
		</div>

		<!-- Lado Direito -->
		<div class="w-[115px] sm:w-[220px] md:w-[240px] lg:w-[180px] col-span-1 flex items-center justify-end">
			<img :src="props.imageAward" onerror="this.src='/imgs/exemplo_premio_01.png'
"
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

const colorBgButton = computed(() => {
	return store.contentApp.colors_background_button;
});

setInterval(() => {
	countDW.value = $countdown(props.countdown);
}, 1000);

</script>

<style scoped>
.arrow {
	background-color: v-bind(colorBgButton);
}
</style>
