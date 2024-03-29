<template>
	<!-- BG padrão de fundo da página -->
	<div class="absolute">
		<LpBgDefault
			v-if="app.config_will_have_hotsite"
			:image="app.layout_background_app_two"
			:imageMobile="app.layout_background_app_mobile_two"
			placeholderImage="/imgs/lp/cover_banner_3.png"
			placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png"
			:bgColor="app.layout_background_colors_app_two"
			position="fixed"
		/>
		<AppLayoutBgDefault v-else />
	</div>

	<AppLayoutHeader
		v-if="app.config_will_have_hotsite"
		:hasLogout="false"
		:bgColor="app.header_colors_background_app_two"
		:textColor="app.header_colors_text_app"
		:isLogoDark="true"
	/>

	<UContainer
		class="flex justify-center min-h-screen pt-14 lg:pt-0"
		:class="isItemsCenter"
		:style="textColor"
	>
		<div
			class="grid-cols-1 lg:grid-cols-[500px_1fr] lg:gap-16 justify-center items-center w-screen"
			:class="isGridLayout"
		>
			<!-- brand -->
			<div class="hidden md:flex justify-center">
				<AppOthersImageBrandSession />
			</div>

			<div class="w-full">
				<!-- Titulo -->
				<p class="fm3 text-base lg:text-lg pb-4">Cadastre sua nova senha.</p>

				<!-- Login e senha -->
				<UForm
					id="resetUser"
					class="space-y-4"
					@submit="storeIncentive.confirmResetPassword(useToast)"
					:state="storeIncentive.resetUser"
					:schema="schema"
				>
					<UFormGroup label="seu e-mail cadastrado" name="email">
						<UInput
							size="xl"
							icon="i-material-symbols-stacked-email-outline"
							v-model="storeIncentive.resetUser.email"
							type="text"
							color="white"
							variant="outline"
							:ui="configInput"
						/>
					</UFormGroup>

					<UFormGroup label="sua nova senha" name="password">
						<UInput
							size="xl"
							v-model="storeIncentive.resetUser.password"
							color="white"
							:type="passView.password"
							:ui="{ ...configInput, icon: { trailing: { pointer: '' } } }"
							icon="i-material-symbols-passkey-outline-rounded"
						>
							<template #trailing>
								<UButton
									v-show="storeIncentive.resetUser.password !== ''"
									color="gray"
									variant="link"
									:icon="passIcon.password"
									:padded="false"
									@click="togglePassView('password')"
								/>
							</template>
						</UInput>
					</UFormGroup>

					<UFormGroup label="confirme sua nova senha" name="confirmPassword">
						<UInput
							size="xl"
							v-model="storeIncentive.resetUser.confirmPassword"
							color="white"
							:type="passView.confirmPassword"
							:ui="{ ...configInput, icon: { trailing: { pointer: '' } } }"
							icon="i-material-symbols-passkey-outline-rounded"
						>
							<template #trailing>
								<UButton
									v-show="storeIncentive.resetUser.confirmPassword !== ''"
									color="gray"
									variant="link"
									:icon="passIcon.confirmPassword"
									:padded="false"
									@click="togglePassView('confirmPassword')"
								/>
							</template>
						</UInput>
					</UFormGroup>

					<div class="flex justify-center">
						<UButton
							size="xl"
							label="salvar"
							type="submit"
							:ui="configButton"
							:style="[colorBgButton, colorTextButton]"
							class="fm3"
							:loading="!storeIncentive.loading"
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
import * as Yup from 'yup';

const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const { pathAssets } = useRuntimeConfig().public;
const toast = useToast();

const schema = object({
	email: string().email('E-mail inválido').required('Campo obrigatório'),
	password: string()
		.min(8, 'Mínimo de 8 caracteres')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
			'A senha deve conter pelo menos um número, uma letra maiúscula e uma letra minúscula'
		)
		.required('Campo obrigatório'),
	confirmPassword: string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Campo obrigatório'),
});

const passView = reactive({
	password: 'password',
	confirmPassword: 'password',
});

const passIcon = reactive({
	password: 'i-material-symbols-visibility-rounded',
	confirmPassword: 'i-material-symbols-visibility-rounded',
});

function togglePassView(view) {
	switch (passView[view]) {
		case 'password':
			passView[view] = 'text';
			passIcon[view] = 'i-material-symbols-visibility-off-rounded';
			break;
		default:
			passView[view] = 'password';
			passIcon[view] = 'i-material-symbols-visibility-rounded';
			break;
	}
}

definePageMeta({
	middleware: ['auth-client'],
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
