<template>
	<!-- BG padrão de fundo da página -->
	<div class="absolute">
		<LpBgDefault v-if="app.config_will_have_hotsite" :image="app.layout_background_app_two" :imageMobile="app.layout_background_app_mobile_two" placeholderImage="/imgs/lp/cover_banner_3.png"
		placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png" :bgColor="app.layout_background_colors_app_two" position="fixed" />
		<AppLayoutBgDefault v-else />
	</div>

	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false" :bgColor="app.header_colors_background_app_two" :textColor="app.header_colors_text_app" :isLogoDark="true" />

		<UContainer>
			<div
				class="flex justify-center min-h-screen py-14" :class="isItemsCenter"
			>
				<div
					class="lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 justify-center w-screen"
					:class="isGridLayout"
				>
					<!-- Imagem do Brand -->
					<div class="hidden lg:block md:flex justify-center">
						<AppOthersImageBrandSession />
					</div>

					<div class="flex flex-col justify-center">
						<div class="">
							<h1
								class="fm3 uppercase text-[12px] md:text-[22px]"
								:style="`color: ${store.contentApp.colors_text_two}`"
							>
								{{ store.contentApp.regulation_text_title }}
							</h1>
						</div>
						<div class="fm2 flex justify-center pb-8">
							<p
								class="text-[9px] md:text-[20px] text-justify"
								:style="`color: ${store.contentApp.colors_text_one}`"
							>
								{{ store.contentApp.regulation_text_document }}
							</p>
						</div>
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

// centralizar conteúdo
const isItemsCenter = computed(() => {
return {
	'items-center': app.config_will_have_image_brand_session_hotsite,
};
});
</script>

<style scoped></style>
