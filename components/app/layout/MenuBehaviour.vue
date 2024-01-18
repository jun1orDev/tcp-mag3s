<template>
  <nav id="menu_behaviour"
    class="fixed lg:relative w-full lg:w-max py-0 px-2 lg:py-0 lg:px-10 lg:mt-12 bottom-0 left-[50%] -translate-x-[50%] bg-transparent z-50">
    <!-- Efeito de fundo -->
    <div>
      <div class="absolute left-0 top-0 w-full h-[50%] lg:rounded-t-3xl" :style="backgroundMenu"></div>
      <div class="absolute left-0 bottom-0 w-full h-[50%] lg:rounded-b-3xl" :style="backgroundMenu"></div>
    </div>

    <!-- Menu -->
    <ul class="grid gap-4 lg:gap-14 grid-flow-col max-w-[420px] lg:max-w-[500px] m-auto">
      <li v-for="item in store.menuBehaviour" :key="item.id" v-show="item.hidden" class="relative flex justify-center items-start">
        <NuxtLink :to="item.path" class="cursor-pointer py-2" :class="item.name ? 'group' : ''" @click="store.openMenuBehaviour(item.submenu)">
          <div
            class="group-hover:-translate-y-7 group-hover:md:-translate-y-9 group-hover:lg:-translate-y-10 transition-all">
            <UChip :text="item.badge" size="2xl" :show="item.badge" inset>
              <Icon :name="item.icon"
                class="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 transition-all h-icon-i group-hover:border-4 group-hover:rounded-full group-hover:p-1 group-hover:lg:p-2"
                :class="item.enable ? 'h-icon-i-enable border-4 rounded-full p-1 lg:p-2' : '' || !item.name ? `h-icon-i-hamburger` : ''"
                :color="iconColor" />
            </UChip>
            <p v-if="item.name"
              class="fm3 group-hover:block transition-all hidden absolute -translate-x-[50%] left-[50%] -bottom-6"
              :style="textColor">{{
                item.name }}</p>
          </div>
        </NuxtLink>

        <ul v-if="item.submenu && store.isOpenMenuBehaviour" class="absolute bottom-28 right-2 lg:right-0 flex flex-col justify-between w-screen">
          <li v-for="submenu in item.submenu" :key="submenu.id" class="flex justify-end items-center mb-8 lg:mb-4 last:mb-0">
            <p class="fm3 text-right me-4 !text-white" :style="textColor">{{ submenu.name }}</p>
            <UChip :text="submenu.badge" size="2xl" :show="submenu.badge" inset>
              <Icon :name="submenu.icon"
                class="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 h-icon-i-enable rounded-full p-1 lg:p-2"
                :color="iconColor" />
            </UChip>
          </li>
        </ul>
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

const textColor = computed(() => {
  return `color: ${app.menu_behaviour_text_colors}`;
});

const iconColor = computed(() => {
  return `${app.menu_behaviour_icon_colors}`;
});

const iconColorHover = computed(() => {
  return `${app.menu_behaviour_icon_hover_colors}`;
});
</script>

<style>
#menu_behaviour .group:hover .h-icon-i,
.h-icon-i-enable {
  color: v-bind(iconColorHover) !important;
  background-color: v-bind(iconColor) !important;
  border-style: solid !important;
  border-color: v-bind(iconColorHover) !important;
}

#menu_behaviour .h-icon-i-hamburger:hover {
  color: v-bind(iconColorHover) !important;
}
</style>