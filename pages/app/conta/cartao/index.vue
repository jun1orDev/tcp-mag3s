<template>
	<LpBgDefault
		:image="bgImage"
		:imageMobile="bgImageMobile"
		placeholderImage="/imgs/lp/cover_banner_3.png"
		placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png"
		:bgColor="app.layout_background_colors_app_two"
		position="fixed"
	/>

	<AppLayoutHeader
		v-if="app.config_will_have_hotsite"
		:hasLogout="false"
		:bgColor="app.header_colors_background_app_two"
		:textColor="app.header_colors_text_app"
		:isLogoDark="true"
	/>

	<AppOthersImageBrandSession />
	
</template>

<script>
const { pathAssets } = useRuntimeConfig().public;

const bgImage = computed(() => {
	return `${pathAssets}${app.layout_background_app_two}`;
});

const bgImageMobile = computed(() => {
	return `${pathAssets}${app.layout_background_app_mobile_two}`;
});
</script>

<style  scoped></style>