<template>
	<div>
		<UModal v-model="store.isOpenModalMediaDelete">
			<UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
				<template #header>
					<!-- Content -->

					<div class="flex items-center justify-between">
						<h2 class="font-bold text-xl">Exclusão de mídia</h2>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="store.$resetChosenMediaDelete" />
					</div>
				</template>
				<div class="text-center">
					<UIcon name="i-material-symbols-scan-delete-rounded" class="text-red-500 text-6xl" />
					<h3>Tem certeza que deseja excluir <span class="text-red-500 font-bold">{{ store.chosenMediaDelete.name }}*</span>?</h3>
				</div>
					<p class="text-red-500 text-end mt-10"><small>*Essa ação não poderá ser desfeita!</small></p>
				<template #footer>
					<!-- Content -->

					<div class="flex justify-end">
						<UButton label="cancelar" size="lg" class="me-4" color="white" @click="store.$resetChosenMediaDelete" />
						<UButton label="sim, quero excluir" size="lg" color="red" @click="store.deleteChosenMedia(useToast)" />
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
