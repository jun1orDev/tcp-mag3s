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
      <div class="absolute left-0 bottom-0 h-3/6 lg:h-3/6 w-full" :style="bgColor">
      </div>
      
      <!-- Influencer -->
      <UContainer class="absolute bottom-[10%] lg:bottom-[20%] z-10">

        <div class="absolute left-0 bottom-1/2 lg:flex items-end">
          <!-- Imagem -->
          <UAvatar src="/imgs/lp/influencer.jpg" alt="Avatar" size="4xl" :ui="configInfluencer" class="" />
          <div class="absolute w-20 h-20 lg:w-36 lg:h-36 border-8 rounded-full top-0" :style="borderColor"></div>

          <!-- Descrição -->
          <div class="fm1 ms-2 mb-4">
            <p>Influencer:</p>
            <p>#nomedoinfluencer</p>
          </div>
        </div>

      </UContainer>

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

const borderColor = computed(() => {
  return `border-color: ${app.colors_border_two}`
})

const bgColor = computed(() => {
  return `background: linear-gradient(6deg, ${app.colors_background_three} 50%, transparent 50%); backface-visibility: hidden;`;
});

const configInfluencer = ref({
  size: {
    "4xl": 'w-20 h-20 lg:w-36 lg:h-36 text-4xl'
  }
});
</script>

<style scoped></style>
