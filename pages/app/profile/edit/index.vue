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
		class="flex justify-center min-h-screen pt-14 lg:pt-0"
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

				<UForm id="formMail" class="space-y-4">
					<UFormGroup label="seu nome completo" name="name">
						<UInput
							size="xl"
							icon="i-material-symbols-account-circle-full"
							type="text"
							color="white"
							variant="outline"
							:ui="configInput"
						/>
					</UFormGroup>

					<UFormGroup label="seu CPF" name="cpf">
						<UInput
							size="xl"
							icon="i-material-symbols-123"
							type="CPF"
							color="white"
							:ui="configInput"
						/>
					</UFormGroup>

					<UFormGroup label="seu e-mail" name="email">
						<UInput
							size="xl"
							icon="i-material-symbols-stacked-email-outline"
							type="text"
							color="white"
							variant="outline"
							:ui="configInput"
						/>
					</UFormGroup>

					<UFormGroup label="seu telefone" name="number">
						<UInput
							size="xl"
							icon="i-material-symbols-call"
							v-model="storeIncentive.formLogin.number"
							type="number"
							color="white"
							:ui="configInput"
						/>
					</UFormGroup>

					<p class="text-center mt-4">
						Que alterar sua senha?
						<NuxtLink to="/esqueceu-senha" class="fm3 decoration-solid">
							Clique aqui</NuxtLink
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

const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const { pathAssets } = useRuntimeConfig().public;

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
