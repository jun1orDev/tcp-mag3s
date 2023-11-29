<template>
	<div>
		<AppLayoutBgDefault />
		<UContainer class="pb-36">
			<div class="py-6">
				<h1 class="title uppercase text-[#847248] text-[12px] md:text-[22px]">
					{{ store.contentApp.sessions_title_four }}
				</h1>
			</div>
			<div class="text flex justify-center pb-8">
				<p class="text-white text-[9px] md:text-[20px] text-justify">
					{{ store.contentApp.sessions_subtitle_seven }}
				</p>
			</div>
		</UContainer>

		<div
			class="py-5 fixed bottom-0 left-0 right-0 bg-cover bg-[url('/imgs/img_fundo_loading.png')]"
		>
			<UContainer>
				<div>
					<p class="text-white text-center text-[9px] md:text-[12px]">
						{{ store.contentApp.sessions_subtitle_eight }}
					</p>
				</div>
				<div class="flex items-center justify-center">
					<div class="p-4">
						<img
							:src="ImgFieldaSorte"
							onerror="this.src='/imgs/img_fiel_da_sorte.png'"
							class="mx-auto"
						/>
					</div>
					<div class="h-10 border-l-2 border-white"></div>
					<div class="p-4">
						<img
							:src="ImgFielDigital"
							onerror="this.src='/imgs/fiel.png'"
							class="mx-auto"
						/>
					</div>
				</div>
			</UContainer>
		</div>
	</div>
</template>

<script setup>

import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const { pathAssets } = useRuntimeConfig().public;


const ImgFieldaSorte = computed(() => {
	return `${pathAssets}${store.contentApp.sessions_image_four}`;
});

const ImgFielDigital = computed(() => {
	return `${pathAssets}${store.contentApp.sessions_image_five}`;
});
</script>

<style scoped>
.title {
	font-family: 'Gotham Black';
}
.text {
	font-family: 'Gotham Book';
}
</style>
