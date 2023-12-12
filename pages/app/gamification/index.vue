<template>
	<div v-show="!storeIncentive.loading">
		<img class="w-full h-screen" src="/imgs/Scratchcard_Gamification.png" />
	</div>
	<!-- <AppGameRotateScreen /> -->
	<!-- <AppGameFeedbackNegative /> -->
	<AppGameFeedbackPositive />

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreIncentive } from '~/stores/incentive';
const storeIncentive = useStoreIncentive();

definePageMeta({
	middleware: ['auth-user']
});
</script>

<style scoped></style>
