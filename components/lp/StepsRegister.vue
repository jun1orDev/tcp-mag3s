<template>
  <div :style="[bgColor, colorText]" class="py-12">
    <UContainer>
      <h1 class="fm3 uppercase mb-10">Olha só como é fácil participar</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        <div v-for="(step, index) in steps" class="flex flex-col items-center">
          <div :style="[colorBgButton, colorTextButton]" class="w-10 h-10 rounded-full flex justify-center items-center">
            <span class="fm3">{{ index + 1 }}</span>
          </div>

          <h2 class="fm3 mt-3 text-2xl">{{ step.title }}</h2>
          <p class="fm1 mt-5 text-center text-base leading-5">{{ step.description }}</p>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const steps = ref([
  { title: 'Adiquira', description: 'você se cadastra rapidinho e já pode começar sua coleção de figurinhas.' },
  { title: 'Concorra', description: 'Cada figurinha te dá números da sorte pra você concorrer a uma viagem até Miami e a chance conhecer seu artista favorito!' },
  { title: 'Participe', description: 'Quanto mais figurinhas você colecionar, mais chances você vai ter no dia do sorteio!' },
]);

const colorText = computed(() => {
  return `color: ${app.colors_text_one};`;
});

const bgColor = computed(() => {
  return `background: ${app.colors_background_three};`;
});

const colorBgButton = computed(() => {
  return `background-color: ${app.colors_background_button};`;
});

const colorTextButton = computed(() => {
  return `color: ${app.colors_text_button};`;
});
</script>

<style scoped></style>
