<template>
	<div class="flex justify-center items-center">
		<!-- LINHA HORIZONTAL -->
		<hr class="w-0 h-0 bg-white absolute" :class="props.largura" />
		<!-- LINHA DIAGONAL -->
		<hr class="diagonal-line w-0 h-0 bg-white" :class="props.diagonal" />
	</div>
</template>

<script setup>
const props = defineProps(['largura', 'diagonal']);
</script>

<style scoped></style>
