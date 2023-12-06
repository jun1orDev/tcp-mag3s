<template >
	<div class="relative" :style="background">
		<UContainer :style="colorText" class="py-12">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center md:text-start">

        <!-- Primeiro Influencer do Ranking -->
				<div class="lg:w-[600px] lg:h-[600px] bg-contain bg-center bg-no-repeat flex justify-center items-center" :style="backgroundInfluencer">
					<!-- Imagem -->
					<div class="animate__animated animate__zoomIn w-36 h-36 lg:w-48 lg:h-48">
						<UAvatar :src="imageInfluencerFirstRanking" alt="Avatar" size="4xl" :ui="configInfluencer" class="" />
						<div class="absolute w-36 h-36 lg:w-48 lg:h-48 border-8 rounded-full top-0" :style="borderColor"></div>
					</div>
				</div>
        
        <!-- Lista com os melhores colocados do Ranking -->
				<div>
					<h3 class="fm3 text-3xl md:text-4xl lg:text-5xl mb-5 uppercase"></h3>
					<p class="text-xl lg:text-3xl lg:leading-10 uppercase"></p>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

const colorText = computed(() => {
	return `color: ${app.session_colors_text_one};`;
});

const borderColor = computed(() => {
	return `border-color: ${app.colors_border_two}`
})

const background = computed(() => {
	return `background-color: ${app.session_background_colors_hotsite_one}`;
});

const backgroundInfluencer = computed(() => {
	return `background-image: url('${app.session_background_influencer_race_hotsite}'), url('/imgs/lp/bg_ranking_influencers.png');`;
});

const imageInfluencerFirstRanking = computed(() => {
	return app.image ? `${pathAssets}${app.image}` : '/imgs/lp/influencer.jpg'
});
</script>

<style scoped></style>
