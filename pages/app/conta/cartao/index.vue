<template>
	<!-- Imagem de fundo -->
	<LpBgDefault :image="bgImage" :imageMobile="bgImageMobile" placeholderImage="/imgs/lp/cover_banner_3.png"
		placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png" :bgColor="app.layout_background_colors_app_two"
		position="fixed" />
	<!-- Header -->
	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false"
		:bgColor="app.header_colors_background_app_two" :textColor="app.header_colors_text_app" :isLogoDark="true" />

	<UContainer class="pt-14 pb-24 lg:pt-0 lg:pb-14" :class="isItemsCenter" :style="textColor">
		<div class="flex flex-col justify-center min-h-screen">
			<div class="grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 lg:gap-16 justify-center items-center w-full"
				:class="isGridLayout">
				<!-- Brand -->
				<AppOthersImageBrandSession />

				<!-- Formulário Credit Card -->
				<div>
					<h1 class="fm3 text-xl lg:text-2xl">Quer cadastrar seu cartão de crédito?</h1>
					<p class="fm2 text-base">Fique tranquilo, nosso processo é super seguro.</p>
					<div class="w-full pb-8 sm:pb-0">
						<AppOthersCreditCard :willHavePurchese="false" :hasDisableButton="true" />
					</div>
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
import { useStoreCheckout } from '~/stores/checkout';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const storeCheckout = useStoreCheckout();
const storeIncentive = useStoreIncentive();
const app = store.contentApp;
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	middleware: ['auth-client', 'verify-accout-user-data', 'redirect-auth-user-payment-creditcard'],
});

const bgImage = computed(() => {
	return `${pathAssets}${app.layout_background_app_two}`;
});

const bgImageMobile = computed(() => {
	return `${pathAssets}${app.layout_background_app_mobile_two}`;
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

storeCheckout.formRegister.configPayment.labelButton = `salvar cartão`;

onNuxtReady(async () => {
	// Menu Habilitado
	store.selectMenuBehaviour(0, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(4, 'path', `/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`);
});
</script>

<style scoped></style>
