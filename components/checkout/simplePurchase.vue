<template>
	<div class="animate__animated animate__fadeIn">
		<h2 v-if="!props.isDark" class="fm3 text-center text-base sm:text-2xl lg:text-xl mb-3 lg:mb-5" :style="colorText">
			Adquira chances de
			ganhar!</h2>

		<!-- Quantidades disponíveis -->
		<div class="grid grid-cols-3 items-end gap-2 md:gap-4 lg:gap-6">
			<CheckoutSimplePackage v-for="(pkg, index) in app.purchase_tables_images_list.list" :package="pkg"
				:isPopular="index === 1" :key="index" />
		</div>

		<UForm :state="storeCheckout.packageChosen" :schema="schema"
			@submit="storeCheckout.purchaseOnlyPaymentMethod(storeCheckout.packageChosen.id, '', props.pathRedirect, 'adquirir')">
			<UFormGroup name="qtd" class="text-center">
				<div class="flex justify-between items-center mt-5 border border-color rounded-full p-1 px-3 mx-6 text-color"
					:style="props.isDark ? colorBgInput : ''">
					<!-- + -->
					<button type="button"
						class="cursor-pointer border border-color rounded-full h-max active:scale-90 shadow-xl active:transition-all select-none"
						:style="colorBgInput" @click.prevent="storeCheckout.setQtdPackageChosen('sub', 5, false)">
						<Icon name="i-ic-round-remove" class="w-8 h-8 md:w-10 md:h-10" />
					</button>
					<!-- Input de mais ou menos  -->
					<div>
						<UInput type="number" name="qtd" variant="none" size="xl" placeholder="+000" :ui="configInput"
							v-model="storeCheckout.packageChosen.qtd" v-maska data-maska="###" inputmode="numeric"
							@input="storeCheckout.changePackagePerQtd" />
					</div>
					<!-- - -->
					<button type="button"
						class="cursor-pointer border border-color rounded-full h-max active:scale-90 shadow-xl active:transition-all select-none"
						:style="colorBgInput" @click.prevent="storeCheckout.setQtdPackageChosen('add', 5, false)">
						<Icon name="i-ic-round-add" class="w-8 h-8 md:w-10 md:h-10" />
					</button>
				</div>
			</UFormGroup>

			<!-- Preço Final -->
			<div class="flex flex-col items-center mt-3" :style="colorText">
				<p class="fm1 text-lg">{{ storeCheckout.pricePackageMultipleAmout }}</p>

				<!-- Botão para continuar a compra -->
				<UButton type="submit" :label="storeCheckout.formRegister.configSimplePayment.labelButton"
					:ui="{ rounded: 'rounded-full' }" size="xl" :style="[colorBgButton, colorTextButton]"
					:loading="storeCheckout.formRegister.configSimplePayment.processPayment || !storeCheckout.formRegister.configSimplePayment.labelButton"
					trailing class="fm3 px-12 mt-5" />
			</div>
		</UForm>

	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';
import { object, number } from 'yup';

const app = useStoreApp().contentApp;
const storeCheckout = useStoreCheckout();

const props = defineProps(['isDark', 'pathRedirect']);

const schema = object({
	qtd: number().truncate().min(1, 'Quantidade Mínima é de 1')
		.required('Campo obrigatório')
});

const colorText = computed(() => {
	if (props.isDark) {
		return `color: ${app.purchase_tables_colors_text_simple_package_dark}`;
	}
	return `color: ${app.purchase_tables_colors_text_simple_package}`;
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const colorInput = computed(() => {
	return `${app.purchase_tables_colors_input_simple_package}`;
});

const colorBgInput = computed(() => {
	return `background-color: ${app.purchase_tables_colors_background_input_simple_package}`;
});

const configInput = ref({
	base: "fm3 text-center placeholder-center text-color [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
	size: {
		xl: 'text-2xl md:text-3xl'
	}
});

onNuxtReady(() => {
		storeCheckout.formRegister.configSimplePayment.labelButton = "adquirir";
});
</script>

<style scoped>
.border-color {
	border-color: v-bind(colorInput);
}

.text-color {
	color: v-bind(colorInput);
}
</style>
