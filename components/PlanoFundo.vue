<template>
	<div v-show="!store.loading" :class="`bg-[url('${pathAssets}${store.contentApp.layout_background_app}')]`"
		class="overflow-hidden bg-cover fixed bg-slate-950 top-0 right-0 left-0 bottom-0 bg-no-repeat bg-center -z-10">
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

const { pathAssets } = useRuntimeConfig().public;

await store.getContentApp(useToast);
</script>

<style scoped></style>
