<template>
  <div class="fm2 rounded-xl p-4" :style="[colorBackground, colorText]">
    <div class="fm3 flex justify-end items-center md:translate-x-8">
      <p class="tracking-tighter text-7xl md:text-[4.9rem] translate-x-3.5 md:translate-x-4 -translate-y-2">2x</p>
      <p class="uppercase text-xl md:text-1xl bg-green-600 ps-5 pe-2 md:pe-8 py-1 md:py-1.5 rounded-e-xl">Super Oferta!
      </p>
    </div>
    <div>
      <p>Receba o <strong>DOBRO</strong> de raspadinhas e o <strong>DOBRO</strong> de números da sorte por um adicional de
        apenas <strong>R$4,90</strong>!</p>
    </div>
    <div id="checkOB" class="mt-3">
      <UCheckbox v-model="storeCheckout.selectedOB" name="enableOB" label="Sim, eu quero!" :ui="configCheckbox" @change="storeCheckout.changePackage" />
    </div>
  </div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';
import { useStoreCheckout } from '~/stores/checkout';

const store = useStoreApp();
const app = store.contentApp;

const storeIncentive = useStoreIncentive();
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

const colorTD = computed(() => {
  return app.purchase_tables_text_colors_order_bump;
})

const colorBackground = computed(() => {
  return `background-color: ${app.purchase_tables_background_colors_order_bump}`;
});

const colorText = computed(() => {
  return `color: ${app.purchase_tables_text_colors_order_bump}`;
});

const configCheckbox = ref({
  "label": 'fm1 textColor'
});
</script>

<style>
#checkOB .textColor {
  color: v-bind(colorTD);
}
</style>
