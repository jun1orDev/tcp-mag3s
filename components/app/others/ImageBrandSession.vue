<template>
	<div>
		<!-- brand -->
		<div class="flex justify-center" v-if="app.config_will_have_image_brand_session_hotsite">
				<img
					class="max-w-[300px] md:max-w-full md:w-[480px] lg:w-auto"
					:src="imgBrand"
					onerror="this.src='/imgs/lp/landing_cover_image.png'"
				/>
			</div>

	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = store.contentApp;

const { pathAssets } = useRuntimeConfig().public;

const imgBrand = computed(() => {
	return `${pathAssets}${app.brand_image_session}`;
});
</script>

<style scoped>

</style>
