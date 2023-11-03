<template>
	<div>
		<PlanoFundo />
		<UContainer>
			<BannerHome class="mt-16" />
			<BannerRaspadinha class="mt-10" />
			<CardPremios class="mt-10" />
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

store.getContentApp(useToast);
</script>

<style scoped></style>
