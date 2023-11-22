<template>
  <div class="fixed w-full z-50 animate__animated animate__fadeInDown">
    <div class="bg-transparent py-2 lg:py-6">
      <UContainer class="flex justify-between items-center">
        <div>
        </div>
        <div>
          <UButton to="/login" size="xl" variant="outline" :style="color" :ui="optionsButton">{{app.header_button_label_one}}</UButton>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const color = computed(() => {
  return `color: ${app.colors_background_button};`;
});

const optionsButton = ref({
  rounded: 'rounded-full',
  "padding": {
    "2xs": "px-2 py-1",
    "xs": "px-2.5 py-1.5",
    "sm": "px-2.5 py-1.5",
    "md": "px-3 py-2",
    "lg": "px-5 py-2.5",
    "xl": "px-8 py-2.5"
  },
});
</script>

<style scoped></style>
