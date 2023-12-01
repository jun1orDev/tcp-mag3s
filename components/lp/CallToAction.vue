<template>
  <UButton :label="labelButton" :ui="{ rounded: 'rounded-full' }" block size="xl" :style="[colorBgButton, colorTextButton]" class="fm3 fixed bottom-3 lg:bottom-10 left-1/2 !-translate-x-1/2 max-w-[80%] md:max-w-xl uppercase animate__animated animate__fadeInDown" />
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const app = useStoreApp().contentApp;

const labelButton = ref('Quero participar');

const colorBgButton = computed(() => {
  return `background-color: ${app.colors_background_button}`;
});

const colorTextButton = computed(() => {
  return `color: ${app.colors_text_button}`;
});
</script>

<style scoped></style>
