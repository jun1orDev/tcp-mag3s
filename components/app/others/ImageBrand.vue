<template>
	<div>
		<!-- brand -->
		<div class="flex justify-center" v-if="app.config_will_have_image_brand_faq">
				<img
					class="w-28 lg:w-auto"
					:src="imgBrand"
					onerror="this.src='/imgs/lp/landing_cover_image.png'"
				/>
			</div>

	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

const imgBrand = computed(() => {
	return `${pathAssets}${store.contentApp.brand_image_five}`;
});
</script>

<style scoped>

</style>
