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

	<UContainer :class="[isItemsCenter, storeIncentive.userLoggedIn ? 'pt-14 lg:pt-24' : 'pt-12 lg:pt-0']">
		<div class="flex flex-col lg:justify-center min-h-screen">
			<div
				class="grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[500px_1fr] gap-12 lg:gap-24 items-center justify-center w-full"
				:class="isGridLayout">

				<!-- Imagem do Brand -->
				<AppOthersImageBrandSession />

				<div class="flex flex-col justify-center">
					<div>
						<h1 class="fm3 uppercase text-lg md:text-[22px]" :style="colorText">
							Dúvidas? Sugestões? Entre com contato com a gente.
						</h1>
					</div>

					<div class="fm2">
						<p class="text-base md:text-[20px]" :style="colorText">
							Nosso serviço de atendimento está pronto pra te atender e tirar qualquer dúvida.
						</p>
					</div>

					<!-- WhatsApp -->
					<div v-if="app.config_will_phone_contact" class="mt-2 mb-4">
						<p class="fm2 md:text-[24px] ">Nosso whatsapp:</p>

						<NuxtLink target="_blank"
							:to="`https://wa.me/55${phone}?text=Ol%C3%A1%2C+preciso+de+ajuda+no+site+da+promo%C3%A7%C3%A3o%21`"
							class="flex items-center">
							<UIcon name="i-mdi-whatsapp" class="text-3xl md:text-4xl lg:text-5xl" />
							<p class="fm3 px-2 text-base md:text-[22px] lg:text-[24px]" :style="colorText">
								<span>{{ app.config_text_phone_contact }}</span>
							</p>
						</NuxtLink>
					</div>

					<!-- E-mail -->
					<div v-if="app.config_will_email_contact" class="mt-2">
						<p class="fm2 md:text-[24px] ">Nosso e-mail:</p>

						<NuxtLink target="_self" :to="`mailto:${app.config_text_email_contact}`" class="flex items-center">
							<UIcon name="i-mdi-email-arrow-right-outline" class="text-3xl md:text-4xl lg:text-5xl" />
							<p class="fm3 px-2 text-base md:text-[22px] lg:text-[24px]" :style="colorText">
								<span>{{ app.config_text_email_contact }}</span>
							</p>
						</NuxtLink>
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
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const storeIncentive = useStoreIncentive();
const app = useStoreApp().contentApp;
const { pathAssets } = useRuntimeConfig().public;

const isGridLayout = computed(() => {
	return {
		'grid': app.config_will_have_image_brand_session_hotsite,
	};
});

const isItemsCenter = computed(() => {
	return {
		'items-center': app.config_will_have_image_brand_session_hotsite,
	};
});

const colorText = computed(() => {
	if (app.config_will_have_hotsite) {
		return `color: ${app.colors_text_one_dark}`;
	} else {
		return `color: ${app.colors_text_one}`;
	}
});

const phone = computed(() => {
	return app.config_text_phone_contact.replace(/[^\w\s]/gi, "").replace(/\s+/g, "");
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
