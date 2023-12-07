<template>
	<AppLayoutBgDefault />
	<UContainer
		class="flex items-center justify-center min-h-screen pt-14 lg:pt-24 lg:pb-80 pb-52"
	>
		<div
			class="lg:grid-cols-[400px_1fr] gap-8 lg:gap-24 items-start justify-center w-screen"
			:class="classGrid"
		>
			<!-- Imagem do Brand -->
			<AppOthersImageBrand />

			<div class="flex flex-col justify-center">
				<div>
					<h1 class="fm3 uppercase text-[#847248] text-[12px] md:text-[22px]">
						{{ store.contentApp.sessions_title_four }}
					</h1>
				</div>

				<div class="fm2">
					<p class="text-white text-[9px] md:text-[20px] text-justify">
						{{ store.contentApp.sessions_subtitle_seven }}
					</p>
				</div>
			</div>
		</div>
	</UContainer>

	<!-- footer informativo -->
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
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

const ImgFieldaSorte = computed(() => {
	return `${pathAssets}${store.contentApp.sessions_image_four}`;
});

const ImgFielDigital = computed(() => {
	return `${pathAssets}${store.contentApp.sessions_image_five}`;
});

const classGrid = computed(() => {
	return {
		grid: app.config_will_have_image_brand_session_hotsite,
	};
});
</script>

<style scoped></style>
