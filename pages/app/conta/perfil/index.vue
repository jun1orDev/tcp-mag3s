<template>
	<LpBgDefault :image="bgImage" :imageMobile="bgImageMobile" placeholderImage="/imgs/lp/cover_banner_3.png"
		placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png" :bgColor="app.layout_background_colors_app_two"
		position="fixed" />

	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false"
		:bgColor="app.header_colors_background_app_two" :textColor="app.header_colors_text_app" :isLogoDark="true" />

	<UContainer class="pt-14 pb-24 lg:pt-0 lg:pb-14" :class="isItemsCenter" :style="textColor">
		<div class="flex flex-col justify-center min-h-screen">
			<div class="grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 lg:gap-16 justify-center items-center w-full"
				:class="isGridLayout">
				<!-- brand -->
				<AppOthersImageBrandSession />

				<div class="w-full pb-8 sm:pb-0">
					<!-- Titulo -->
					<p class="fm3 text-base lg:text-lg mb-4">Seus dados pessoais.</p>

					<!-- Dados Cadastrais -->
					<UForm id="changeProfileData" class="space-y-4" :state="storeIncentive.userAcountData" :schema="schema"
						@submit="storeIncentive.saveEditProfile(useToast)">
						<UFormGroup label="Nome completo:" name="name">
							<UInput size="xl" v-model="storeIncentive.userAcountData.name" icon="i-material-symbols-person-outline"
								type="text" color="white" variant="outline" :ui="configInput" placeholder="Digite aqui seu nome..."
								inputmode="text" />
						</UFormGroup>

						<UFormGroup label="CPF:" name="cpf">
							<UInput size="xl" v-model="storeIncentive.userAcountData.cpf" icon="i-material-symbols-wallet" type="CPF"
								v-maska data-maska="###.###.###-##" color="white" :ui="configInput" placeholder="###.###.###-##"
								:disabled="storeIncentive.disabledInputs.cpf" inputmode="numeric" />
						</UFormGroup>

						<UFormGroup label="E-mail:" name="email">
							<UInput size="xl" v-model="storeIncentive.userAcountData.email"
								icon="i-material-symbols-stacked-email-outline" type="text" color="white" variant="outline"
								:ui="configInput" placeholder="Digite aqui seu e-mail..." inputmode="email" disabled />
						</UFormGroup>

						<UFormGroup label="Telefone:" name="phone.number">
							<UInput size="xl" icon="i-material-symbols-add-call-outline-rounded"
								v-model="storeIncentive.userAcountData.phone.number" type="tel" v-maska
								data-maska="['(##) #####-####', '(##) ####-####']" color="white" :ui="configInput"
								placeholder="(##) #####-####" inputmode="tel" />
						</UFormGroup>

						<p class="text-center mt-4">
							Para alterar sua senha
							<NuxtLink to="/recuperar-senha" class="fm3 decoration-solid">
								clique aqui</NuxtLink>
						</p>

						<div class="flex justify-center">
							<UButton size="xl" label="salvar" type="submit" :ui="configButton"
								:style="[colorBgButton, colorTextButton]" class="fm3" :loading="storeIncentive.loading" trailing />
						</div>
					</UForm>
				</div>
			</div>

			<!-- Menu Behaviour -->
			<div v-if="storeIncentive.userLoggedIn">
				<AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
				<div v-if="app.config_will_have_hotsite">
					<AppLayoutMenuBehaviour />
				</div>
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

definePageMeta({
	middleware: ['auth-user'],
});

const schema = object({
	name: string().trim().matches(/^(\S+\s){1,}\S+$/, 'Por favor, insira seu nome completo.')
		.matches(/^[^\d]+$/, 'O nome completo não pode conter números.').required('Campo nome é obrigatório.'),
	phone: object({
		number: string()
			.required('O campo telefone é obrigatório')
			.min(14 || 15, 'Insira o telefone corretamente'),
	}),
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

const isItemsCenter = computed(() => {
	return {
		'items-center': !app.config_will_have_image_brand_session_hotsite,
	};
});

const configInput = ref({
	rounded: 'rounded-full',
	variant: {
		outline: 'bg-white',
	},
});

const configButton = ref({
	rounded: 'rounded-full',
	padding: {
		xl: 'px-16 py-2.5',
	},
});

onNuxtReady(async () => {
	// Buscando informações de sorteio caso o usuário estiver logado
	if (storeIncentive.userLoggedIn) {
		await storeIncentive.lotteryDraws(useToast);
	}

	storeIncentive.disabledInputs.cpf = storeIncentive.userAcountData.cpf != null;
	storeIncentive.disabledInputs.phone = storeIncentive.userAcountData.phone.number != null;

	// Menu Habilitado
	store.selectMenuBehaviour(0, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(4, 'path', `/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`);
});
</script>

<style></style>
