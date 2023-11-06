<template>
	<div class="min-h-screen">
		<!-- Fundo com Ícone e marca d'água -->
		<div
			class="fixed flex top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] -z-10 text-[500px] opacity-[4%] text-green-600">
			<UIcon name="i-material-symbols-perm-media" />
		</div>

		<!-- Header -->
		<AdmHeader />

		<!-- Conteúdo -->
		<UContainer>
			<!-- Menu Lateral -->
			<AdmAsideBar />

			<div v-if="doYouHaveMedia" class="py-24">
				<!-- Filtros -->
				<div class="mb-8">
					<h2 class="mb-2 text-base font-semibold">Filtros de Tags:</h2>
					<div class="flex pb-2 overflow-x-auto">
						<AdmTag v-for="tag in store.tags" class="w-fit me-3 last:me-0" :tag="tag" />
					</div>
				</div>

				<!-- Lista das mídias cadastradas -->
				<div class="mb-8">
					<AdmMedias />
				</div>

				<!-- Botão para Adicionar  -->
				<AdmButtonNewMedia position="fixed" />
			</div>

			<AdmNoMedias v-else />

			<!-- Modal para preencher ou editar dados de uma mídia -->
			<AdmMediaModal />

			<!-- Modal para deletar uma mídia expecífica -->
			<AdmDeleteMediaModal />
		</UContainer>


		<!-- Footer -->
		<AdmFooter />
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';
const store = useStoreAdmin();

const doYouHaveMedia = computed(() => {
	return store.medias.length;
})

definePageMeta({
	middleware: ["auth"]
})

await store.getContent(useToast);
</script>

<style scoped></style>
