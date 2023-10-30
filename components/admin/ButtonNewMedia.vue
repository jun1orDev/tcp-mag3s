<template>
	<!-- Botão para Adicionar  -->
	<div class="right-[80px] bottom-[80px] xl:right-[100px] xl:bottom-[140px] z-50" :class="position">
		<UTooltip class="absolute" text="Adicionar Mídia">
			<UButton size="xl" color="green" variant="solid" :ui="{ rounded: 'rounded-full' }" square
				icon="i-material-symbols-note-stack-add-outline" @click="store.openModalMediaNew" />
		</UTooltip>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const store = useStoreAdmin();
const props = defineProps(['position']);

const { position } = toRefs(props);
</script>

<style scoped></style>
