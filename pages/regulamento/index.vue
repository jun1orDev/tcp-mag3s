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

	<UContainer :class="[isItemsCenter, storeIncentive.userLoggedIn ? 'pt-14 lg:pt-24' : 'pt-12 lg:pt-14']">
		<div class="flex flex-col lg:justify-center min-h-screen">
			<div class="grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[500px_1fr] gap-8 lg:gap-16 justify-center w-full"
				:class="isGridLayout">

				<!-- Imagem do Brand -->
				<div class="flex justify-center">
					<AppOthersImageBrandSession />
				</div>

				<div class="flex flex-col justify-center">
					<div>
						<h1 class="fm3 uppercase text-lg md:text-[22px]" :style="`color: ${store.contentApp.colors_text_two}`">
							{{ store.contentApp.regulation_text_title }}
						</h1>
					</div>
					<div class="fm2 flex justify-center pb-8">
						<div class="text-base md:text-[20px] text-justify" :style="colorText"
							v-html="store.contentApp.regulation_text_document"></div>
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
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const storeIncentive = useStoreIncentive();
const app = useStoreApp().contentApp;

const isGridLayout = computed(() => {
	return {
		'grid': app.config_will_have_image_brand_session_hotsite,
	};
});

const colorText = computed(() => {
	if (app.config_will_have_hotsite) {
		return `color: ${app.colors_text_one_dark}`;
	} else {
		return `color: ${app.colors_text_one}`;
	}
});

// centralizar conteúdo
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
