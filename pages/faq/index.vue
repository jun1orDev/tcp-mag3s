<template>
	<AppLayoutBgDefault />
	<UContainer>
		<!-- Faq -->
		<AppOthersCampoPesquisa :inputPlaceholder="store.contentApp.layout_text_input" class="mt-14"
			@input="store.filteredFaq(store.searchingValue)" />

		<UAccordion v-if="store.filteredFaq(store.searchingValue).length" :items="store.filteredFaq(store.searchingValue)" :ui="{ wrapper: 'flex flex-col w-full' }" class="mt-6">
			<template #default="{ item, index, open }">
				<UButton color="transparent" variant="ghost" class="border-b"
					:ui="{ rounded: 'rounded-none', padding: { sm: 'py-3 px-0' } }"
					:style="[colorText, open && colorTextButton, colorBorder]">
					<span class="fm3 lg:text-lg">{{ item.one }}</span>
					<template #trailing>
						<UIcon name="i-heroicons-chevron-down-20-solid"
							class="w-7 h-7 lg:w-10 lg:h-10 ms-auto transform transition-transform duration-200"
							:style="[colorText, open && colorTextButton]" :class="[open && 'rotate-180']" />
					</template>
				</UButton>
			</template>

			<template #item="{ item }">
				<p class="fm1 text-md md:text-base lg:text-lg" :style="colorText">
					{{ item.two }}
				</p>
			</template>
		</UAccordion>

		<div v-else :style="colorText" class="flex flex-col justify-center items-center mt-20">
			<UIcon name="i-material-symbols-deployed-code-alert-outline-sharp" class="w-20 h-20" />
			<p>Não há FAQ cadastrado no momento!</p>
		</div>
	</UContainer>

	<!-- Footer informativo -->
	<div class="p-9 justify-end fixed bottom-0 left-0 right-0 bg-cover" :style="colorText">
		<div class="flex flex-col">
			<p class="fm1 text-[10px] md:text-[14px] text-center mb-3" v-html="app.sessions_title_six"></p>
		</div>
		<div class="flex items-center justify-center">
			<div>
				<img :src="ImgWhatsApp" onerror="this.src='/imgs/whats.png'" class="w-[30px]" />
			</div>
			<p class="fm3 ml-2 text-[20px] lg:text-[24px]">
				{{ app.sessions_subtitle_five }}
			</p>
		</div>
		<div>
			<p class="fm3 text-center text-[14px] md:text-[20px] mt-1">
				{{ app.sessions_subtitle_teen }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const { pathAssets } = useRuntimeConfig().public;

// Lógica para pesquisa do Faq
const handleSearch = () => {
	store.filteredFaq = store.faq.list.filter((item) => { item.one.toLowerCase().includes(store.searchingValue) });
};

// Personalização da tela
const ImgWhatsApp = computed(() => {
	return `${pathAssets}${store.contentApp.sessions_image_three}`;
});

const colorText = computed(() => {
	return `color: ${store.contentApp.colors_text_one}`;
});

const colorTextButton = computed(() => {
	return `color: ${store.contentApp.colors_text_button_two}`;
});

const colorBorder = computed(() => {
	return `border-color: ${store.contentApp.colors_border_one}`;
});
</script>

<style scoped></style>
