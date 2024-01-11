<template>
	<AppGameRotateScreen class="landscape:hidden" />
	<div>
		<iframe
      :src="iframeSrc"
      frameborder="0"
      allowfullscreen
			sandbox="allow-same-origin allow-scripts"
			class="w-screen h-screen border-0 m-0 p-0 overflow-hidden z-auto"
    ></iframe>
	</div>
</template>

<script setup>
const { ApiIncentiveGamification } = useRuntimeConfig().public;
const iframeSrc = ref(`${ApiIncentiveGamification}?tkn=${useTokenUser().value}`);
console.log(useTokenUser().value)

definePageMeta({
	middleware: ['auth-user']
});
</script>

<style scoped></style>
