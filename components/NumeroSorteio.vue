<template>
	<div
		class="cor h-10 w-10 rounded-xl flex justify-center items-center" :style="`background-color: ${props.customBackground}`"
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
</style>
