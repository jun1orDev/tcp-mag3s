<template>
	<div :class="isUserAdminLogIn ? 'lg:mt-[30px] animate__animated animate__fadeIn' : ''">
		<NuxtPage :page-key="route => route.fullPath" />
		<OthersIndicatorAdmin />
	</div>
	<UNotifications />
</template>

<script setup>
const isUserAdminLogIn = useCookie('idUser').value;
</script>
