<template>
	<div class="min-h-screen">
		<AdmHeader />

		<UContainer>

			<AdmAsideBar />

			<div>
				<div>
					<h2>Tags:</h2>
				</div>

				<div>
					<h2>Editar o conteúdo da aplicação:</h2>

					<div class="grid grid-cols-5 border rounded-xl mb-5 last:mb-0 px-4 py-2" v-for="singleContent in store.content">
						<div>
							<small>Nome do conteúdo:</small>
							<p>{{ singleContent.name }}</p>
						</div>
						<div>
							<small>Tag:</small>
							<p>{{ singleContent.tag }}</p>
						</div>
						<div>
							<small>Tipo:</small>
							<p>{{ singleContent.type }}</p>
						</div>
						<div>
							<small>Valor:</small>
							<p>{{ singleContent.value }}</p>
						</div>
						<div>
							<small class="block">Ações:</small>
							<UButton color="red" icon="i-material-symbols-delete-forever-outline" size="sm"/>
						</div>
					</div>
				</div>
			</div>
		</UContainer>

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
