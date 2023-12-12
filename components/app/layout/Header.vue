<template>
	<div id="header-app" class="fixed w-full z-50 animate__animated animate__fadeIn" :style="textColor">
		<div class="bg-transparent py-2 lg:py-6">
			<UContainer class="flex justify-between items-center">
				<div>
					<LpImageBrand class="max-w-[110px]" />
				</div>
				<div>
					olá, fulano!
				</div>
			</UContainer>
		</div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const bgColor = computed(() => {
	return `${app.header_colors_background_app}`;
});

const textColor = computed(() => {
	return `color: ${app.header_colors_text_app}`;
});

onMounted(() => {
	headerScrollStyle('header-app', 20, 'animate__fadeInDown');
});
</script>

<style>
#header-app.has-bg-color {
	background-color: v-bind(bgColor);
}
</style>
