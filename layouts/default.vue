<template>
	<div>
		<NuxtPwaManifest />
		<NuxtPage :page-key="route => route.fullPath" />
	</div>
		<button @click="useNuxtApp().$pwa.install()">
			Install {{ useNuxtApp().$pwa?.isPWAInstalled }}
		</button>
	<UNotifications />
</template>

<script></script>
