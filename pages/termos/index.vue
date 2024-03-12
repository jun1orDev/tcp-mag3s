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

	<UContainer :class="[isItemsCenter, storeIncentive.userLoggedIn ? 'pt-14 lg:pt-24' : '']">
		<div class="flex flex-col min-h-screen" :class="[storeIncentive.userLoggedIn ? 'justify-start' : 'justify-center']">
			<div
				class="grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[500px_1fr] gap-8 lg:gap-16 justify-center items-center w-full"
				:class="isGridLayout">

				<!-- Imagem do Brand -->
				<div class="flex justify-center">
					<AppOthersImageBrandSession />
				</div>

				<!-- titulo e subtitulo -->
				<div class="flex flex-col justify-center">
					<div>
						<h1 class="fm3 uppercase text-lg md:text-[22px]" :style="`color: ${app.colors_text_two}`">
							{{ app.terms_and_condition_text_title }}
						</h1>
					</div>

					<div class="fm2">
						<p class="text-base md:text-[20px] text-justify" :style="colorText"
							v-html="app.terms_and_condition_text_document"></p>
					</div>
				</div>
			</div>

			<!-- Menu Behaviour -->
			<div v-if="storeIncentive.userLoggedIn">
				<AppLayoutOverlay :showing="store.isOpenMenuBehaviour" />
				<div v-if="app.config_will_have_hotsite">
					<AppLayoutMenuBehaviour />
					<div class="mt-12 md:mt-32"></div>
				</div>
			</div>
		</div>

	</UContainer>

	<!-- footer politica e logos -->
	<UContainer v-if="!app.config_will_have_hotsite" class="fixed bottom-0 left-0 right-0 px-0 md:px-4">
		<div class="py-6 px-4 bg-cover" :style="background">
			<div class="max-w-[600px] m-auto">
				<p class="text-center text-[9px] md:text-[12px]" :style="`color: ${app.colors_text_one}`">
					{{ app.terms_and_condition_text_policy }}
				</p>
			</div>
			<div class="flex items-center justify-center mt-5">
				<div class="w-[150px] md:w-auto">
					<img :src="imageLogo" onerror="this.src='/imgs/img_fiel_da_sorte.png'" class="mx-auto" />
				</div>
				<div class="h-10 border-l-2 mx-5" :style="`color: ${app.colors_text_one}`"></div>
				<div class="w-[100px] md:w-auto">
					<img :src="imageLogoTwo" onerror="this.src='/imgs/fiel.png'" class="mx-auto" />
				</div>
			</div>
		</div>
	</UContainer>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const storeIncentive = useStoreIncentive();
const app = useStoreApp().contentApp;
const { pathAssets } = useRuntimeConfig().public;

const colorText = computed(() => {
	if (app.config_will_have_hotsite) {
		return `color: ${app.colors_text_one_dark}`;
	} else {
		return `color: ${app.colors_text_one}`;
	}
});

const background = computed(() => {
	return `background-image: url('${pathAssets}${app.layout_background_footer_app}'), url('/imgs/fundo_modal_placeholder.png'); background-color: ${app.colors_background_one}`;
});

const imageLogo = computed(() => {
	return `${pathAssets}${app.brand_image_one}`;
});

const imageLogoTwo = computed(() => {
	return `${pathAssets}${app.brand_image_two}`;
});

const isGridLayout = computed(() => {
	return {
		grid: app.config_will_have_image_brand_session_hotsite,
	};
});

const isItemsCenter = computed(() => {
	return {
		'items-center': app.config_will_have_image_brand_session_hotsite,
	};
});

onNuxtReady(async () => {
	// Buscando informações de sorteio caso o usuário estiver logado
	if (storeIncentive.userLoggedIn) {
		await storeIncentive.lotteryDraws(useToast);
	}

	// Menu Habilitado
	store.selectMenuBehaviour(0, 'enable', true, true);
	// Exibir ou não a raspadinha
	store.selectMenuBehaviour(2, 'showing', app.config_will_have_scratch_card && storeIncentive.hasScratchCardQtd);
	// Inserindo o link para a opção dos números da sorte no Menu
	store.selectMenuBehaviour(4, 'path', `/app/revelar-premio/${storeIncentive.gamification.lotteryDraws.nextDraw.id}`);
});
</script>

<style scoped></style>
