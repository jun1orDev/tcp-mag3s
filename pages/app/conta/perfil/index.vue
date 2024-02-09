<template>
	<LpBgDefault
		:image="bgImage"
		:imageMobile="bgImageMobile"
		placeholderImage="/imgs/lp/cover_banner_3.png"
		placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png"
		:bgColor="app.layout_background_colors_app_two"
		position="fixed"
	/>

	<UContainer
		class="flex justify-center min-h-screen py-14 lg:pt-0"
		:class="isItemsCenter"
		:style="textColor"
	>
		<div
			class="grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 lg:gap-16 justify-center items-center w-screen"
			:class="isGridLayout"
		>
			<!-- brand -->
			<AppOthersImageBrandSession />

			<div class="w-full pb-8 sm:pb-0">
				<!-- Titulo -->
				<p class="fm3 text-base lg:text-lg mb-4">Seus dados pessoais.</p>

				<!-- Dados Cadastrais -->

				<UForm
					id="changeProfileData"
					class="space-y-4"
					:validate="validade"
					:state="storeIncentive.userAcountData"
					:schema="schema"
					@submit="storeIncentive.saveEditProfile()"
				>
					<UFormGroup label="Nome completo:" name="name">
						<UInput
							size="xl"
							v-model="storeIncentive.userAcountData.name"
							icon="i-material-symbols-person-outline"
							type="text"
							color="white"
							variant="outline"
							:ui="configInput"
							placeholder="Digite aqui seu nome..."
						/>
					</UFormGroup>

					<UFormGroup label="CPF:" name="cpf">
						<UInput
							size="xl"
							v-model="storeIncentive.userAcountData.cpf"
							icon="i-material-symbols-wallet"
							type="CPF"
							v-maska
							data-maska="###.###.###-##"
							color="white"
							:ui="configInput"
							placeholder="###.###.###-##"
						/>
					</UFormGroup>

					<UFormGroup label="E-mail:" name="email">
						<UInput
							size="xl"
							v-model="storeIncentive.userAcountData.email"
							icon="i-material-symbols-stacked-email-outline"
							type="text"
							color="white"
							variant="outline"
							:ui="configInput"
							placeholder="digite aqui seu e-mail..."
						/>
					</UFormGroup>

					<UFormGroup label="Telefone:" name="phone">
						<UInput
							size="xl"
							icon="i-material-symbols-add-call-outline-rounded"
							v-model="storeIncentive.userAcountData.phone"
							type="tel"
							v-maska
							data-maska="['(##) #####-####', '(##) ####-####']"
							color="white"
							:ui="configInput"
							placeholder="(##) #####-####"
						/>
					</UFormGroup>

					<p class="text-center mt-4">
						Para alterar sua senha
						<NuxtLink to="/recuperar-senha" class="fm3 decoration-solid">
							clique aqui</NuxtLink
						>
					</p>

					<div class="flex justify-center">
						<UButton
							size="xl"
							label="salvar"
							type="submit"
							:ui="configButton"
							:style="[colorBgButton, colorTextButton]"
							class="fm3"
							trailing
						/>
					</div>
				</UForm>
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';
import { object, string } from 'yup';


const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const { pathAssets } = useRuntimeConfig().public;

const schema = object({
	name: string()
    .matches(/^(\S+\s){1,}\S+$/, 'Por favor, insira seu nome completo.')
    .matches(/^[^\d]+$/, 'O nome não pode conter números.')
    .required('Campo nome é obrigatório.'),
	phone: string()
		.min(14 || 15, 'Insira o telefone corretamente')
		.required('O campo telefone é obrigatório'),
	cpf: string()
		.min(14, 'Insira o CPF corretamente')
		.required('O campo CPF é obrigatório'),
	email: string()
		.email('E-mail inválido')
		.required('Insira o email corretamente.'),
});

const bgImage = computed(() => {
	return `${pathAssets}${app.layout_background_app_two}`;
});

const bgImageMobile = computed(() => {
	return `${pathAssets}${app.layout_background_app_mobile_two}`;
});

const textColor = computed(() => {
	return `color: ${app.layout_text_colors_login_and_checkout}`;
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const isGridLayout = computed(() => {
	return {
		grid: app.config_will_have_image_brand_session_hotsite,
	};
});

const configInput = ref({
	rounded: 'rounded-full',
});

const configButton = ref({
	rounded: 'rounded-full',
	padding: {
		xl: 'px-16 py-2.5',
	},
});
</script>

<style></style>
