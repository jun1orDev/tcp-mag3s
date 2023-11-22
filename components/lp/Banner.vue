<template>
  <div class="h-screen flex items-center" :style="colorText">
    <LpBgDefault />
    <UContainer class="grid lg:grid-cols-2">

      <!-- Brand Principal -->
      <div class="flex flex-col justify-start mb-12 lg:mb-0 lg:mt-12 xl:mt-0">
        <img :src="logoMain" onerror="this.src='/imgs/lp/logo_main.png'" alt=""
          class="w-[200px] sm:w-[230px] md:w-[280px] lg:w-[310px] xl:w-[360px]">
        <p class="fm1">{{ app.brand_text_one }}</p>
      </div>
      
      <!--  Efeito de quebra de seção -->
      <div class="absolute left-0 bottom-0 h-3/6 lg:h-3/6 w-full" :style="bgColor"></div>

      <!-- Imagem de destaque -->
      <div>
        <Carousel id="carousel-next-prizes" :autoplay="0" :wrap-around="false" :pause-autoplay-on-hover="true">
          <Slide v-for="slide in 1" :key="slide">
            <img class="max-w-[90%]" :src="brandMain" onerror="this.src='/imgs/lp/landing_cover_image.png'" alt="">
          </Slide>
        </Carousel>
      </div>      
    </UContainer>
  </div>
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

const bgColor = computed(() => {
  return `background: linear-gradient(6deg, ${app.colors_background_two} 50%, transparent 50%); backface-visibility: hidden;`;
});
</script>

<style scoped></style>
