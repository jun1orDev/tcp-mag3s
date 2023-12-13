<template>	
	<!-- BG padrão de fundo da página -->
	<div class="absolute">
		<LpBgDefault v-if="app.config_will_have_hotsite" :image="app.layout_background_app_two" :imageMobile="app.layout_background_app_mobile_two" placeholderImage="/imgs/lp/cover_banner_3.png"
		placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png" :bgColor="app.layout_background_colors_app_two" position="fixed" />
		<AppLayoutBgDefault v-else />
	</div>

	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app_two" :textColor="app.header_colors_text_app" :isLogoDark="true" />
	
	<UContainer class="flex justify-center min-h-screen py-14" :class="isItemsCenter">
		<div class="md:grid-cols-[400px_1fr] gap-12 lg:gap-24 items-center justify-center w-screen" :class="isGridLayout">
			<!-- Imagem do Brand -->
			<AppOthersImageBrandSession class="order-2 lg:order-1" />

			<div class="flex flex-col justify-center order-1 lg:order-2  ">
				<div>
					<h1 class="fm3 uppercase text-[12px] md:text-[22px] text-white">
						Dúvidas? Sugestões? Entre com contato com a gente.
					</h1>
				</div>

				<div class="fm2">
					<p class="text-[9px] md:text-[20px] text-white order-1">
						Nossa serviço de atendimento está pronto pra te atender e tirar qualquer dúvida.
					</p>
				</div>

				<div class="flex items-center py-7">
					<img src="/imgs/whats.png">
					<p class="fm3 text-white px-2 text-[22px] md:text-[32px]">(11) 91221 3445</p>
				</div>
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';

const store = useStoreApp();
const app = useStoreApp().contentApp;

const isGridLayout = computed(() => {
	return {
		'grid': app.config_will_have_image_brand_session_hotsite,
	};
});

const isItemsCenter = computed(() => {
	return {
		'items-center': app.config_will_have_image_brand_session_hotsite,
	};
});
</script>

<style scoped></style>
