<template>
	<div class="max-w-[600px] m-auto lg:w-full lg:m-0">
		<div>
			<h1 v-html="titleText" class="fm3 text-xl lg:text-2xl mb-1"></h1>
			<p class="fm2 text-lg">{{ descriptionText }} <ULink type="link" :to="{path: '/checkout/login', query: {idPkg: storeCheckout.packageChosen.id}}" class="fm3">Clique aqui</ULink>
				.</p>
		</div>

		<!-- Primeira parte do Cadastro -->
		<UForm id="formRegisterOne" :validate="validate" :state="state" class="space-y-4 mt-6"
			@submit="storeCheckout.registerEmail(useToast, storeCheckout.packageChosen.id, '/checkout/cadastro2')">
			<UFormGroup label="E-mail:" name="email">
				<UInput size="xl" v-model="storeCheckout.formRegister.email" type="email" color="white" variant="outline"
					:ui="configInput" icon="i-material-symbols-stacked-email-outline" />
			</UFormGroup>

			<UFormGroup label="Senha:" name="password">
				<UInput size="xl" v-model="storeCheckout.formRegister.password" type="password" color="white" :ui="configInput"
					icon="i-material-symbols-passkey-outline-rounded" />
			</UFormGroup>

			<UFormGroup label="Confirme a senha:" name="password-confirm">
				<UInput size="xl" v-model="storeCheckout.formRegister.confirmPassword" type="password" color="white"
					:ui="configInput" icon="i-material-symbols-passkey-outline-rounded" />
			</UFormGroup>

			<UCheckbox label="Termos de uso"
				help="Li e aceito os regulamentos e concordo com a política de privacidade e termos de uso."
				v-model="storeCheckout.formRegister.terms" :ui="configCheckbox" required />

			<div class="flex justify-center">
				<UButton size="xl" label="continuar" type="submit" :ui="configButton" :style="[colorBgButton, colorTextButton]"
					class="fm3" :loading="storeCheckout.formRegister.loading" trailing :disabled="!storeCheckout.enableButtonNextOne" />
			</div>
		</UForm>

	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';

const store = useStoreApp();
const app = store.contentApp;
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	layout: 'checkout-default',
	middleware: ['auth-client', 'purchase-list-packages', 'purchase-chosen-package', 'redirect-auth-user-register-one']
});

const textColor = computed(() => {
	return `${app.layout_text_colors_login_and_checkout}`;
});

const titleText = computed(() => {
	return `${app.create_user_text_title_one}`;
});

const descriptionText = computed(() => {
	return `${app.create_user_text_description_one}`;
});

onMounted(() => {
	storeCheckout.progressPurchase(
		[
			{ step: 1, complete: false },
			{ step: 2, complete: false },
			{ step: 3, complete: false },
		],
		16,
		true);
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const configInput = ref({
	"rounded": 'rounded-full',
});

const configButton = ref({
	"rounded": 'rounded-full',
	"padding": {
		"xl": "px-20 py-2"
	},
});

const configCheckbox = ref({
	"label": "text-terms fm3",
	"help": "text-sm text-terms fm2",
});

</script>

<style>
#formRegisterOne .text-terms {
	color: v-bind(textColor);
}
</style>
