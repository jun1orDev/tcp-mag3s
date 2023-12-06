<template>
	<AppLayoutBgDefault />
	<UContainer
		class="flex items-center justify-center min-h-screen pt-14 lg:pt-24 lg:pb-80 pb-52"
	>
		<div
			class="lg:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-start justify-center w-screen" :class="classGrid"
		>
			<!-- brand -->
		<AppOthersImageBrand/>

			<div>
				<!-- Campo de pesquisa  -->
				<AppOthersCampoPesquisa
					:inputPlaceholder="store.contentApp.layout_text_input"
					@input="store.filteredFaq(store.searchingValue)"
				/>

				<!-- Faq -->
				<UAccordion
					v-if="store.filteredFaq(store.searchingValue).length"
					:items="store.filteredFaq(store.searchingValue)"
					:ui="{ wrapper: 'flex flex-col w-full' }"
					class="py-2"
				>
					<template #default="{ item, index, open }">
						<UButton
							color="transparent"
							variant="ghost"
							class="border-b"
							:ui="{ rounded: 'rounded-none', padding: { sm: 'py-3 px-0' } }"
							:style="[colorText, open && colorTextButton, colorBorder]"
						>
							<span class="fm3 lg:text-lg">{{ item.one }}</span>
							<template #trailing>
								<UIcon
									name="i-heroicons-chevron-down-20-solid"
									class="w-7 h-7 lg:w-10 lg:h-10 ms-auto transform transition-transform duration-200"
									:style="[colorText, open && colorTextButton]"
									:class="[open && 'rotate-180']"
								/>
							</template>
						</UButton>
					</template>

					<template #item="{ item }">
						<p class="fm1 text-md md:text-base lg:text-lg" :style="colorText">
							{{ item.two }}
						</p>
					</template>
				</UAccordion>

				<!-- Sem FAQ -->
				<div
					v-else
					:style="colorText"
					class="flex flex-col justify-center items-center mt-20"
				>
					<UIcon
						name="i-material-symbols-deployed-code-alert-outline-sharp"
						class="w-20 h-20"
					/>
					<p>Não há FAQ cadastrado no momento!</p>
				</div>
			</div>
		</div>
	</UContainer>

	<!-- Footer informativo -->
	<div
		class="bg-no-repeat bg-cover bg-center px-6 py-8 lg:py-6 text-center fixed bottom-0 right-0 left-0"
		:style="[background, colorText]"
	>
		<div class="flex flex-col text-white relative z-10">
			<p
				class="fm1 text-[10px] md:text-[14px] text-center mb-3"
				v-html="app.sessions_title_six"
			></p>

			<div class="flex items-center justify-center">
				<div>
					<img
						:src="ImgWhatsApp"
						onerror="this.src='/imgs/whats.png'"
						class="w-[30px]"
					/>
				</div>
				<p class="fm3 ml-2 text-[20px] lg:text-[24px]">
					{{ app.sessions_subtitle_five }}
				</p>
			</div>

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
	store.filteredFaq = store.faq.list.filter((item) => {
		item.one.toLowerCase().includes(store.searchingValue);
	});
};

// Personalização da tela

const imgBrand = computed(() => {
	return `${pathAssets}${store.contentApp.brand_image_five}`;
});

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

const background = computed(() => {
	return `background-image: url('${pathAssets}${store.contentApp.layout_background_modal}'), url('/imgs/fundo_modal_placeholder.png'); background-color: ${store.contentApp.colors_background_one}`;
});

const classGrid = computed(() => {
    return {
        'grid': app.config_will_have_image_brand_faq
    };
});

</script>

<style scoped></style>
