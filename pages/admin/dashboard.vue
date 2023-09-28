<template>
	<div>
		<AdmHeader />

		<UContainer>

			<AdmAsideBar />

			<div>
				<div>
					<h2>Tags:</h2>
				</div>

				<div>

					<h2>Edite o conteúdo da aplicação:</h2>
				</div>
			</div>
		</UContainer>

		<AdmFooter />
	</div>
</template>

<script setup>
definePageMeta({
	middleware: ["auth"]
})
</script>

<style scoped></style>
