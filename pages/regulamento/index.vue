<template>
	<div>
		<AppLayoutBgDefault />
		<UContainer class="pb-36">
			<div class="py-6">
				<h1 class="title uppercase text-[#847248] text-[12px] md:text-[22px]">
					{{ store.contentApp.sessions_title_five }}
				</h1>
			</div>
			<div class="rules flex justify-center pb-8">
				<p class="text-white text-[9px] md:text-[20px] text-justify">
					{{ store.contentApp.sessions_subtitle_nine }}
				</p>
			</div>
		</UContainer>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

</script>

<style scoped>
.title {
	font-family: 'Gotham Black';
}
.rules {
	font-family: 'Gotham Book';
}
</style>
