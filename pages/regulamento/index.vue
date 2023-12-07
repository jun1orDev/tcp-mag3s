<template>
	<div>
		<AppLayoutBgDefault />

		<UContainer>
			<div
				class="flex justify-center min-h-screen pt-14 lg:pt-24 pb-10" :class="center"
			>
				<div
					class="lg:grid-cols-[400px_1fr] gap-8 lg:gap-24 justify-center w-screen"
					:class="classGrid"
				>
					<!-- Imagem do Brand -->
					<AppOthersImageBrand />

					<div class="flex flex-col justify-center">
						<div class="py-6">
							<h1
								class="fm3 uppercase text-[12px] md:text-[22px]"
								:style="`color: ${store.contentApp.colors_text_two}`"
							>
								{{ store.contentApp.sessions_title_five }}
							</h1>
						</div>
						<div class="fm2 flex justify-center pb-8">
							<p
								class="text-[9px] md:text-[20px] text-justify"
								:style="`color: ${store.contentApp.colors_text_one}`"
							>
								{{ store.contentApp.sessions_subtitle_nine }}
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

const classGrid = computed(() => {
	return {
		grid: app.config_will_have_image_brand_session_hotsite,
	};
});

// centralizar conteúdo
const center = computed(() => {
return {
	'items-center': app.config_will_have_image_brand_session_hotsite,
};
});
</script>

<style scoped></style>
