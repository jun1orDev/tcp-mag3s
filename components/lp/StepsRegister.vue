<template>
	<div :style="[bgColor, colorText]" class="py-12">
		<UContainer>
			<div>
				<h1 class="fm3 uppercase mb-10 text-center lg:text-start text-base lg:text-xl" v-html="app.register_steps_title_hotsite">
				</h1>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
				<div v-for="(step, index) in app.register_steps_list_items_hotsite.list" class="flex flex-col items-center">
					<div :style="[colorBgButton, colorTextButton]"
						class="w-10 h-10 rounded-full flex justify-center items-center">
						<span class="fm3">{{ index + 1 }}</span>
					</div>

					<h2 class="fm3 mt-3 text-2xl" v-html="step.one"></h2>
					<p class="fm1 mt-5 text-center text-base lg:text-lg leading-none lg:leading-tight" v-html="step.two"></p>
				</div>
			</div>
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const colorText = computed(() => {
	return `color: ${app.register_steps_text_colors_hotsite};`;
});

const bgColor = computed(() => {
	return `background: ${app.register_steps_background_colors_hotsite};`;
});

const colorBgButton = computed(() => {
	return `background-color: ${app.register_steps_button_background_colors_hotsite};`;
});

const colorTextButton = computed(() => {
	return `color: ${app.register_steps_button_text_colors_hotsite};`;
});
</script>

<style scoped></style>
