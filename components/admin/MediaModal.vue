<template>
	<div>
		<UModal v-model="store.isOpenModalMedia" :fullscreen="true">
			<UCard :ui="options">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
							Adicione uma nova Mídia:
						</h3>
						<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
							@click="store.isOpenModalMedia = false" />
					</div>
				</template>

				<!-- Content -->
				<UContainer>
					<p>oi</p>
				</UContainer>

				<template #footer>
					<!-- Content -->
				</template>
			</UCard>
		</UModal>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const store = useStoreAdmin();

const options = ref({
	base: 'h-full flex flex-col',
	rounded: '',
	divide: 'divide-y divide-gray-100 dark:divide-gray-800',
	body: {
		base: 'grow'
	}
})

</script>

<style lang="css" scoped></style>
