<template>
  <nav class="fixed lg:relative w-full lg:w-max lg:rounded-xl p-4 lg:mt-8 bottom-0 left-[50%] -translate-x-[50%]"
    :style="backgroundMenu">
    <ul class="flex">
      <li v-for="item in store.menuBehaviour" :key="item.name" v-show="item.show">
        <NuxtLink :to="item.path">
          <UChip :text="item.badge" size="2xl" :show="item.badge">
            <UIcon :name="item.icon" class="text-slate-700 text-2xl" />
          </UChip>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
const store = useStoreApp();
const app = store.contentApp;

const backgroundMenu = computed(() => {
  return `background-color: ${app.menu_behaviour_background_colors}`;
});
</script>

<style scoped></style>