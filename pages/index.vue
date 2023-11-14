<template></template>

<script setup>
definePageMeta({
	middleware: process.client ? ['has-hotsite'] : undefined
})
</script>

<style></style>
