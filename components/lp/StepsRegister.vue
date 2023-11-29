<template>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

const logoMain = computed(() => {
  return `${pathAssets}${store.contentApp.brand_image_four}`;
});

const brandMain = computed(() => {
  return `${pathAssets}${store.contentApp.brand_image_five}`;
});

const colorText = computed(() => {
  return `color: ${app.colors_text_one};`;
});

const borderColor = computed(() => {
  return `border-color: ${app.colors_border_one}`
})

const bgColor = computed(() => {
  return `background: linear-gradient(6deg, ${app.colors_background_two} 50%, transparent 50%); backface-visibility: hidden;`;
});

const configInfluencer = ref({
  size: {
    "4xl": 'w-20 h-20 lg:w-36 lg:h-36 text-4xl'
  }
});
</script>

<style scoped></style>
