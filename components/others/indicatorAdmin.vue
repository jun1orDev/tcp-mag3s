<template>
	<div v-if="isUserAdminLogIn" class="fm2 w-screen h-[30px] flex justify-between items-center bg-red-700 text-white px-16 fixed top-0 left-0 z-50 animate__animated animate__slideInDown">
		<div class="flex items-center">
			<UIcon name="i-ic-notifications-active" class="me-2 text-xl animate__animated animate__bounceIn animate__repeat-3"/>
			<p>Você está logado como administrador. <NuxtLink to="/admin/login" target="_blank" class="fm3">Clique aqui</NuxtLink> para editar a aplicação. </p>
		</div>
		<div class="flex items-center">
			<UIcon name="i-ic-baseline-local-fire-department" class="me-2 text-xl"/>
			<p><strong class="fm3">{{ useNuxtApp().$config.public.ApiIncentiveClientId }}</strong></p>
		</div>
	</div>
</template>

<script setup>
const isUserAdminLogIn = useCookie('idUser').value;
</script>

<style scoped></style>
