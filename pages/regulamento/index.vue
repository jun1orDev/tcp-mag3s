<template>
	<div>
		<AppLayoutBgDefault />

		<UContainer>
			<div
				class="flex justify-center min-h-screen pt-14 lg:pt-24 pb-10" :class="isItemsCenter"
			>
				<div
					class="lg:grid-cols-[400px_1fr] gap-8 lg:gap-24 justify-center w-screen"
					:class="isGridLayout"
				>
					<!-- Imagem do Brand -->
					<AppOthersImageBrand />

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
	</div>
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
