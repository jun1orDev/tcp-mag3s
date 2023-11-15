<template>
	<div>
		<UInput :rows="1" color="yellow" variant="outline" :placeholder="inputPlaceholder"
			icon="i-heroicons-magnifying-glass-20-solid" size="sm" :trailing="false" class="text-white" />
	</div>
</template>

<script setup>
const props= defineProps (['inputPlaceholder'])</script>

<style scoped></style>
