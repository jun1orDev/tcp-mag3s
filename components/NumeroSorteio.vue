<template>
	<div
		class="cor h-12 w-12 rounded-xl flex justify-center items-center border-black-2" :class="props.customBackground ? 'bg-yellow-400': 'bg-black'"
	>
		<div class="button text-[20px] text-white">
			<span>{{ props.button }}</span>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['button', 'customBackground']);
</script>

<style scoped>
.button {
	font-family: 'Gotham Black';
}
/* .cor{
	background: #DFA701;
} */
</style>
