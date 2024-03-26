<template>
	<div>
		<NuxtPwaManifest />
		<NuxtPage :page-key="route => route.fullPath" />
	</div>
	<UNotifications />
</template>

<script></script>
