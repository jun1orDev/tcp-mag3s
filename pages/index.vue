<template>
	<div>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

await store.getContentApp(useToast);
</script>

<style></style>
