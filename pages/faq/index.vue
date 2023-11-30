<template>
	<div>
		<UContainer>
			<AppLayoutBgDefault />
			<AppOthersCampoPesquisa
				:inputPlaceholder="store.contentApp.layout_text_input"
				class="mt-14"
			/>

			<!-- questionário de duvidas -->

			<UAccordion :items="items" :ui="{ wrapper: 'flex flex-col w-full' }">
				<template #default="{ item, index, open }">
					<UButton
						color="text-white"
						variant="ghost"
						class="mt-6 border-b"
						:ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
						:style="[colorTextButton, colorBorder]"
					>
						<span class="fm3 truncate">{{ item.label }}</span>
						<template #trailing>
							<UIcon
								name="i-heroicons-chevron-right-20-solid"
								class="w-5 h-5 ms-auto transform transition-transform duration-200"
								:class="[open && 'rotate-90']"
							/>
						</template>
					</UButton>
				</template>

				<template #item="{ item }">
					<p class="fm1" :style="colorText">
						{{ item.content }}
					</p>
				</template>
			</UAccordion>
		</UContainer>

		<div
			class="p-9 justify-end fixed bottom-0 left-0 right-0 bg-cover"
			:style="colorText"
		>
			<div class="flex flex-col">
				<p
					class="fm1 text-[10px] md:text-[14px] text-center mb-3"
					v-html="app.sessions_title_six"
				></p>
			</div>
			<div class="flex justify-center">
				<img src="/imgs/whatsapp.png" class="w-[32px]" />
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
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const colorText = computed(() => {
	return `color: ${store.contentApp.colors_text_one}`;
});

const colorTextButton = computed(() => {
	return `color: ${store.contentApp.colors_text_button_two}`;
});

const colorBorder = computed(() => {
	return `border-color: ${store.contentApp.colors_border_one}`;
});

const items = [
	{
		label: 'Por que precisam do meu CPF?',
		defaultOpen: true,
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
	},
	{
		label: 'Meus dados bancários estão seguros?',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
	},
	{
		label: 'Meus dados bancários estão seguros?',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
	},
];
</script>

<style scoped></style>
