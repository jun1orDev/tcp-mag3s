<template>
	<div v-if="store.contentHasBeenLoaded">
		<div :style="background"
			class="w-full relative box-content md:box-border min-h-[100px] md:h-[210px] max-h-[210px] py-4 md:py-6 flex justify-between items-center bg-no-repeat bg-right md:bg-center bg-cover rounded-3xl">

			<!-- Lado Esquerdo -->
			<div class="flex">
				<!-- Imagem de destaque -->
				<div v-if="hasImageDetach">
					<img :src="image" onerror="this.src='/imgs/Mosqueteiro_tablet.png'"
						class="w-[62px] md:w-[98px] h-auto -bottom-1 scale-110" />
				</div>

				<!-- Conteúdo de texto -->
				<div class="flex flex-col justify-between">
					<div :style="`color: ${store.contentApp.colors_text_one}`">

						<!-- Título -->
						<p class="text-xs md:text-base uppercase">
							{{ props.title }}
						</p>

						<!-- Subtítulo -->
						<p class="subtitulo text-[10px] md:text-sm ">
							{{ props.subtitle }}
						</p>

						<!-- Call to action -->
						<div class="flex items-center mt-4 text-[10px] md:text-[14px]">
							<p>
								{{ props.revelar }}
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
			</div>

			<!-- Lado Direito -->
			<div>
				<img :src="props.imageAward" onerror="this.src='/imgs/exemplo_premio_03.png'"
					class="absolute scale-110 -bottom-3 w-[160px] md:w-[250px] h-auto" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['title', 'subtitle', 'revelar', 'validade', 'imageAward', 'hasImageDetach']);

const background = computed(() => {
	return `background-image:url('${pathAssets}${store.contentApp.banner_background_card_one}'), url('/imgs/card_sorteio_atual_mobile.png')`;
});

const image = computed(() => {
	return `${pathAssets}${store.contentApp.banner_image_card_one}`;
});
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
