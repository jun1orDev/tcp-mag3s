<template>
	<transition enter-active-class="animate__animated animate__fadeIn animate__faster"
		leave-active-class="animate__animated animate__fadeOut animate__faster">
		<div v-show="props.showing"
			class="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-50 cursor-not-allowed transition-all"
			@click="store.openMenuBehaviour(true)">
			<div class="top-0 left-0 right-0 bottom-0 bg-black opacity-90 w-screen h-screen cursor-not-allowed transition-all">
			</div>
		</div>
	</transition>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();

const props = defineProps(['showing']);
</script>
