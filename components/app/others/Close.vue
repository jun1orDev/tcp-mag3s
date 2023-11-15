<template>
	<div>
		<!-- BOTÃO FECHAR -->
		<div class="absolute top-8 right-8 items-center text-[#847248] text-[40px] cursor-pointer">
			<UIcon name="i-material-symbols-cancel-outline" @click="fecharConteudoRasp" />
		</div>
	</div>
</template>

<script setup>
const router = useRouter();
function fecharConteudoRasp(params) {
	router.go(-1);
}

</script>

<style scoped></style>
