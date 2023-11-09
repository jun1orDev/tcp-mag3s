<template>
	<li class="rounded-xl box-content flex justify-center items-center border text-white transition-all styleBox">
		<span class="fm3 text-[18px] md:text-[24px]">
			{{ props.numberDraw }}
		</span>
	</li>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp().contentApp;

const props = defineProps(['numberDraw', 'status']);

function switchOptions(validator, style1, style2, style3) {
	switch (validator) {
		case 'awarded':
			return style1;
		case 'nailed':
			return style2;
		default:
			return style3;
	}
}

const backgroundColor = computed(() => {
	return switchOptions(props.status, store.colors_background_three, store.colors_background_two, store.colors_background_one);
});

const textColor = computed(() => {
	return switchOptions(props.status, store.colors_text_one, store.colors_text_one, store.colors_text_one);
});

const borderColor = computed(() => {
	return switchOptions(props.status, 'transparent', 'transparent', store.colors_border_one);
});
</script>

<style>
.styleBox {
	background-color: v-bind(backgroundColor);
	color: v-bind(textColor);
	border-color: v-bind(borderColor);
}
</style>
