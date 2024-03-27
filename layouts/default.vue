<template>
	<div :class="isUserAdminLogIn ? 'mt-[30px] animate__animated animate__fadeIn' : ''">
		<NuxtPwaManifest />
		<NuxtPage :page-key="route => route.fullPath" />
		<OthersIndicatorAdmin />
	</div>
	<UNotifications />
</template>

<script setup>
const isUserAdminLogIn = useCookie('idUser').value;
</script>
