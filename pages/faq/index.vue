<template>
	<AppLayoutBgDefault />
	<UContainer class="flex justify-center min-h-screen pt-14 lg:pt-24 lg:pb-80 pb-52" :class="isItemsCenter">
		<div class="lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 justify-center w-screen" :class="isGridLayout">
			<!-- brand -->
			<AppOthersImageBrand />

			<div>
				<!-- Campo de pesquisa  -->
				<AppOthersInputSearching :inputPlaceholder="app.faq_text_placeholder_input_search"
					@input="store.filteredFaq(store.searchingValue)" />

				<!-- Faq -->
				<UAccordion v-if="store.filteredFaq(store.searchingValue).length" :items="store.filteredFaq(store.searchingValue)"
					:ui="{ wrapper: 'flex flex-col w-full' }" class="py-2">
					<template #default="{ item, index, open }">
						<UButton color="transparent" variant="ghost" :class="!open && index + 1 < store.filteredFaq(store.searchingValue).length ? 'border-b-2' : null" :ui="{ rounded: 'rounded-none', padding: { sm: 'py-3 px-0' } }"
							:style="[colorText, open && colorTextButton, colorBorder]">
							<span class="fm3 lg:text-lg">{{ item.one }}</span>
							<template #trailing>
								<UIcon name="i-heroicons-chevron-down-20-solid"
									class="w-7 h-7 lg:w-10 lg:h-10 ms-auto transform transition-transform duration-200"
									:style="[colorText, open && colorTextButton]" :class="[open && 'rotate-180']" />
							</template>
						</UButton>
					</template>

					<template #item="{ item, index }">
							<p class="fm1 text-md md:text-base lg:text-lg" :style="colorText">
								{{ item.two }}
							</p>
						<div class="mt-5" :class="index + 1 < store.filteredFaq(store.searchingValue).length ? 'border-b-2' : null" :style="[colorBorder]">
						</div>
					</template>
				</UAccordion>

				<!-- Sem FAQ -->
				<div v-else :style="colorText" class="flex flex-col justify-center items-center mt-20">
					<UIcon name="i-material-symbols-deployed-code-alert-outline-sharp" class="w-20 h-20" />
					<p>Não há FAQ cadastrado no momento!</p>
				</div>
			</div>
		</div>
	</UContainer>

	<!-- Footer para contato -->
	<UContainer class="fixed bottom-0 left-0 right-0 px-0 md:px-4">
		<div class="py-6 px-4 bg-cover" :style="background">
			<div class="flex flex-col text-white relative z-10">
				<div class="max-w-[500px] m-auto">
					<p class="fm1 text-[10px] md:text-[14px] text-center mb-3" v-html="app.faq_text_tittle_footer"></p>
				</div>

				<div class="flex items-center justify-center">
					<div>
						<img :src="ImgWhatsApp" onerror="this.src='/imgs/whats.png'" class="w-[30px]" />
					</div>
					<p class="fm3 ml-2 text-[20px] lg:text-[24px]">
						{{ app.config_text_phone_contact }}
					</p>
				</div>

				<p class="fm3 text-center text-[14px] md:text-[20px] mt-1">
					{{ app.config_text_email_contact }}
				</p>
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const { pathAssets } = useRuntimeConfig().public;

// Personalização da tela
const ImgWhatsApp = computed(() => {
	return `${pathAssets}${app.config_image_whatsapp}`;
});

const colorText = computed(() => {
	return `color: ${app.colors_text_one}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_two}`;
});

const colorBorder = computed(() => {
	return `border-color: ${app.colors_border_one}`;
});

const background = computed(() => {
	return `background-image: url('${pathAssets}${app.layout_background_footer_app}'), url('/imgs/fundo_modal_placeholder.png'); background-color: ${app.colors_background_one}`;
});

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
