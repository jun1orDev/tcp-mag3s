<template>
	<div id="main_menu" class="fixed w-full z-50 animate__animated animate__fadeInDown">
		<div class="bg-transparent py-2 lg:py-6">
			<UContainer class="flex justify-between items-center">
				<div>
				</div>
				<div>
					<UButton to="/login" size="xl" variant="outline" :style="colorButton" :ui="optionsButton">
						<span :style="colorTextButton">{{ app.header_button_label_hotsite }}</span>
					</UButton>
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
	return `${app.header_colors_background_hotsite}`;
});

const colorButton = computed(() => {
	return `color: ${app.header_button_background_colors_hotsite};`;
});

const colorTextButton = computed(() => {
	return `color: ${app.header_button_text_colors_hotsite};`;
});

const optionsButton = ref({
	rounded: 'rounded-full',
	"padding": {
		"2xs": "px-2 py-1",
		"xs": "px-2.5 py-1.5",
		"sm": "px-2.5 py-1.5",
		"md": "px-3 py-2",
		"lg": "px-5 py-2.5",
		"xl": "px-8 py-2.5"
	},
});

onMounted(() => {
	let menu = document.getElementById("main_menu");;

	window.addEventListener("scroll", function () {
		if (!menu) {
			return;
		}

		if (window.scrollY > 200) {
			menu.classList.add("hasColor");
			menu.classList.add("animate__fadeInDown");
		} else {
			menu.classList.remove("hasColor");
			menu.classList.remove("animate__fadeInDown");
		}
	});

});
</script>

<style scoped>
.hasColor {
	background-color: v-bind(bgColor);
}

.hover-btn {
	background-color: v-bind(bgColor) !important;
}
</style>
