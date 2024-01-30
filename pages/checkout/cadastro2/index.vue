<template>
	<div class="max-w-[600px] m-auto lg:w-full lg:m-0">
		<div>
			<h1 v-html="titleText" class="fm3 text-xl lg:text-2xl mb-1"></h1>
			<p class="fm2 text-lg">{{ descriptionText }}</p>
		</div>

		<!-- Segunda parte do Cadastro -->
		<UForm
			id="formRegisterTwo"
			:validate="validate"
			:state="storeCheckout.formRegister"
			:schema="schema"
			class="space-y-4 mt-6"
			@submit="
				storeCheckout.registerOthersDatas(
					useToast,
					storeCheckout.packageChosen.id,
					storeCheckout.packageChosenOB.id,
					'/checkout/pagamento'
				)
			"
		>
			<UFormGroup label="Nome completo:" name="name">
				<UInput
					size="xl"
					v-model="storeCheckout.formRegister.name"
					type="text"
					color="white"
					variant="outline"
					:ui="configInput"
					icon="i-material-symbols-person-outline"
				/>
			</UFormGroup>

			<UFormGroup label="Telefone:" name="phone">
				<UInput
					size="xl"
					type="tel"
					color="white"
					:ui="configInput"
					v-maska:[optionsMaskPhone]
					data-maska="['(##) #####-####', '(##) ####-####']"
					icon="i-material-symbols-add-call-outline-rounded"
				/>
			</UFormGroup>

			<UFormGroup label="CPF:" name="cpf">
				<UInput
					size="xl"
					v-model="storeCheckout.formRegister.cpf"
					type="text"
					color="white"
					:ui="configInput"
					v-maska
					data-maska="###.###.###-##"
					icon="i-material-symbols-wallet"
				/>
			</UFormGroup>

			<div class="flex justify-center">
				<UButton
					size="xl"
					label="continuar para pagamento"
					type="submit"
					:ui="configButton"
					:style="[colorBgButton, colorTextButton]"
					class="fm3 mt-6"
					:loading="storeCheckout.formRegister.loading"
					trailing
				/>
			</div>
		</UForm>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';
import { object, string} from 'yup';

const store = useStoreApp();
const app = store.contentApp;
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	layout: 'checkout-default',
	middleware: [
		'auth-client',
		'purchase-list-packages',
		'purchase-chosen-package',
		'redirect-auth-user-register-two',
	],
});

const schema = object({
	name: string().required('O campo nome é obrigatório'),
	phone: string().required('O campo telefone é obrigatório'),
	cpf: string().required('O campo CPF é obrigatório'),
});

const optionsMaskPhone = ref({
	onMaska: (detail) => (storeCheckout.formRegister.phone = detail.unmasked),
});

const titleText = computed(() => {
	return `${app.create_user_text_title_two}`;
});

const descriptionText = computed(() => {
	return `${app.create_user_text_description_two}`;
});

onMounted(() => {
	storeCheckout.progressPurchase(
		[
			{ step: 1, complete: false },
			{ step: 2, complete: false },
			{ step: 3, complete: false },
		],
		35,
		true
	);
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const configInput = ref({
	rounded: 'rounded-full',
});

const configButton = ref({
	rounded: 'rounded-full',
	padding: {
		xl: 'px-12 py-2',
	},
});
</script>

<style lang="scss" scoped></style>
