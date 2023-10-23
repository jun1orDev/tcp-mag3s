<template>
	<div class="min-h-screen">
		<!-- Fundo com Ícone e marca d'água -->
		<div
			class="fixed flex top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] -z-10 text-[500px] opacity-[4%] text-green-600">
			<UIcon name="i-material-symbols-perm-media" />
		</div>

		<!-- Header -->
		<AdmHeader />

		<UContainer class="pt-20">
			<!-- Menu Lateral -->
			<AdmAsideBar />

			<!-- Filtros -->
			<div>
				<div class="mb-8">
					<h2 class="mb-2 text-lg font-bold">Filtros de Tags:</h2>
					<div class="flex flex-wrap">
						<AdmTag v-for="tag in store.tags" class="me-4" :tag="tag" />
					</div>
				</div>

				<!-- Lista das mídias cadastradas -->
				<div class="mb-8">
					<h2 class="mb-2 text-lg font-bold">Editar o conteúdo da aplicação:</h2>

					<AdmMedias />
				</div>
			</div>
		</UContainer>

		<!-- Botão para Adicionar  -->
		<div class="fixed w-full bottom-0 z-50">
			<UTooltip class="absolute right-[10px] bottom-[80px]" text="Adicionar Mídia">
				<UButton size="xl" color="green" variant="soft" :ui="{ rounded: 'rounded-full' }" square
					icon="i-material-symbols-note-stack-add-outline" @click="store.isOpenModalMedia = true" />
			</UTooltip>
		</div>

		<!-- Modal para preencher ou editar dados de uma mídia -->
		<AdmMediaModal />

		<!-- Footer -->
		<AdmFooter />
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const store = useStoreAdmin();

definePageMeta({
	middleware: ["auth"]
})

await store.getContent(useToast);
</script>

<style scoped></style>
