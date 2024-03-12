<template>
	<!-- BG padrão de fundo da página -->
	<div class="absolute">
		<LpBgDefault v-if="app.config_will_have_hotsite" :image="app.layout_background_app_two"
			:imageMobile="app.layout_background_app_mobile_two" placeholderImage="/imgs/lp/cover_banner_3.png"
			placeholderImageMobile="/imgs/lp/cover_banner_mobile_3.png" :bgColor="app.layout_background_colors_app_two"
			position="fixed" />
		<AppLayoutBgDefault v-else />
	</div>

	<AppLayoutHeader v-if="app.config_will_have_hotsite" :hasLogout="false"
		:bgColor="app.header_colors_background_app_two" :textColor="app.header_colors_text_app" :isLogoDark="true" />

	<UContainer class="pt-14 pb-24 lg:pt-0 lg:pb-14" :class="isItemsCenter" :style="textColor">
		<div class="flex flex-col justify-center min-h-screen">
			<div
				class="grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[550px_1fr] gap-8 lg:gap-16 justify-center items-center w-full"
				:class="isGridLayout">
				<!-- brand -->
				<AppOthersImageBrandSession />

				<div class="w-full pb-8 sm:pb-0">
					<!-- Titulo -->
					<p class="fm3 text-xl mb-2" v-html="titleText"></p>

					<!-- Descrição -->
					<p class="fm2 text-base mb-4" v-html="descriptionText"></p>

					<!-- Compra simplificada de pacote -->
					<CheckoutSimplePurchase v-if="app.config_will_have_raffle" :isDark="true"
						pathRedirect="/checkout/cadastro1" />

					<!-- Tabela de Preços -->
					<div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
						<CheckoutPackage :package="packageProduct" :packageOB="storeCheckout.packages[index + 1]"
							:isCallToAction="true" v-for="(packageProduct, index) in storeCheckout.packages" />
					</div>

					<!-- Novo Cadastro Freemium -->
					<p v-if="!storeIncentive.userLoggedIn && app.config_will_have_freemium_purchase" class="fm2 mt-4">
						<strong>Ainda não se decidiu?</strong> Cadastre-se
						<strong>
							<NuxtLink to="/login" class="fm3 decoration">
								aqui</NuxtLink>
						</strong> e receba um número da sorte grátis. ;)
					</p>

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
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const storeCheckout = useStoreCheckout();
const { pathAssets } = useRuntimeConfig().public;

definePageMeta({
	middleware: ['auth-client', 'purchase-list-packages']
});

const textColor = computed(() => {
	return `color: ${app.layout_text_colors_login_and_checkout}`;
});

const titleText = computed(() => {
	return `${app.purchase_tables_text_title}`;
});

const descriptionText = computed(() => {
	return `${app.purchase_tables_text_description}`;
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const isGridLayout = computed(() => {
	return {
		'grid': app.config_will_have_image_brand_session_hotsite,
	};
});

const isItemsCenter = computed(() => {
	return {
		'items-center': !app.config_will_have_image_brand_session_hotsite,
	};
});

onNuxtReady(async () => {
	// Buscando informações de sorteio caso o usuário estiver logado
	if (storeIncentive.userLoggedIn) {
		await storeIncentive.lotteryDraws(useToast);
	}

	storeCheckout.selectedOB = null;

	// Menu Habilitado
	store.selectMenuBehaviour(3, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(4, 'path', `/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`);
});
</script>

<style></style>
