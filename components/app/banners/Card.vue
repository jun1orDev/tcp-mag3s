<template>
	<NuxtLink :to="props.linkSource"
		class="w-full relative grid grid-flow-col auto-cols-auto justify-between px-4 sm:px-6 md:px-8">
		<!-- Background -->
		<div :style="background"
			class="absolute -translate-y-[50%] top-[50%] right-0 left-0 min-h-[110px] sm:h-[200px] md:h-[215px] lg:h-[180px] bg-no-repeat bg-right md:bg-center bg-cover rounded-lg md:rounded-3xl -z-10 animate__animated animate__fadeIn">
		</div>

		<!-- Lado Esquerdo -->
		<div class="grid grid-flow-col auto-cols-auto justify-start items-center col-span-2">

			<!-- Imagem de destaque -->
			<div v-if="props.hasImageDetach" class="w-[60px] sm:w-[110px] lg:w-[90px] me-5 animate__animated animate__zoomIn">
				<img :src="imageDT" onerror="this.src='/imgs/Mosqueteiro_tablet.png'" />
			</div>

			<!-- Conteúdo de texto -->
			<div v-if="props.loading" :style="`color: ${store.contentApp.colors_text_one}`"
				class="flex flex-col h-full py-6 sm:py-12 md:py-14"
				:class="props.description ? 'justify-between' : 'justify-center'">

				<div class="text-start">
					<!-- Título -->
					<h1
						class="fm3 text-[12px] sm:text-[18px] md:text-[22px] lg:text-[19px] uppercase animate__animated animate__fadeInDown">
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
					</div>
				</div>

				<!-- Call to action -->
				<div v-if="props.callToAction"
					class="fm3 flex items-center mt-4 text-[10px] sm:text-[12px] md:text-[14px] uppercase tracking-wider animate__animated animate__fadeInDown">
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

			<div v-else class="space-y-2 opacity-30">
				<USkeleton class="h-2 sm:h-3 md:h-4 w-[80px] sm:w-[180px] md:w-[150px] xl:w-[200px]" />
				<USkeleton class="h-2 sm:h-3 md:h-4 w-[70%]" />
			</div>
		</div>

		<!-- Lado Direito -->
		<div v-if="props.imageAward" class="w-[115px] sm:w-[220px] md:w-[240px] lg:w-[180px] col-span-1 flex items-center justify-end animate__animated animate__tada">
			<img :src="props.imageAward" onerror="this.src='/imgs/exemplo_premio_01.png'" />
		</div>
	</NuxtLink>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const { $countdown } = useNuxtApp();

const props = defineProps(['linkSource', 'loading', 'title', 'subtitle', 'countdown', 'callToAction', 'description', 'imageAward', 'imageDetach', 'hasImageDetach']);

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
