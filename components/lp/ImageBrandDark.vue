<template>
  <div>
    <img :src="logoMain" onerror="this.src='/imgs/lp/logo_main_dark.png'" alt=""
      class="w-[200px] sm:w-[230px] md:w-[250px] lg:w-[280px] xl:w-[300px] animate__animated animate__fadeInDown">
  </div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = useStoreApp().contentApp;

const { pathAssets } = useRuntimeConfig().public;

const logoMain = computed(() => {
  return `${pathAssets}${app.brand_dark_image_hotsite}`;
});

</script>