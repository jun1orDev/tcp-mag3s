<template>
	<div>
		<UModal v-model="store.isOpenModalMediaDelete">
			<UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
				<template #header>
					<!-- Content -->
					<h2 class="text-center font-bold text-xl">Exclusão de mídia</h2>
				</template>
				<!-- Content -->
				<template #footer>
					<!-- Content -->

					<div class="flex justify-end">
						<UButton label="cancelar" size="lg" class="me-4" color="white" />
						<UButton label="excluir" size="lg" color="red" />
					</div>
				</template>
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';

const store = useStoreAdmin();
</script>

<style scoped></style>
