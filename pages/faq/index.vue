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
			<div
				class="grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[500px_1fr] gap-8 lg:gap-16 justify-center items-start w-full"
				:class="isGridLayout">

				<!-- brand -->
				<div class="flex justify-center">
					<AppOthersImageBrandSession />
				</div>

				<div class="w-full">
					<div v-if="app.config_will_have_hotsite" class="pb-5">
						<p class=" fm3 text-[22px] md:text-[26px] sm:text-[16px]">Perguntas frequentes:</p>

						<!-- Informações de contato -->
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

					<!-- Campo de pesquisa  -->
					<AppOthersInputSearching :inputPlaceholder="app.faq_text_placeholder_input_search"
						@input="store.filteredFaq(store.searchingValue)" :hasMaskInput="null" :inputModeOption="'search'" />

					<!-- Faq -->
					<UAccordion v-if="store.filteredFaq(store.searchingValue).length"
						:items="store.filteredFaq(store.searchingValue)" :ui="{ wrapper: 'flex flex-col w-full' }" class="py-2">
						<template #default="{ item, index, open }">
							<UButton color="transparent" variant="ghost" :class="!open &&
			index + 1 < store.filteredFaq(store.searchingValue).length
			? 'border-b-2'
			: null
			" :ui="{ rounded: 'rounded-none', padding: { sm: 'py-3 px-0' } }"
								:style="[colorText, open && colorTextButton, colorBorder]">
								<span class="fm3 lg:text-lg text-start">{{ item.one }}</span>
								<template #trailing>
									<UIcon name="i-heroicons-chevron-down-20-solid"
										class="w-7 h-7 lg:w-10 lg:h-10 ms-auto transform transition-transform duration-200"
										:style="[colorText, open && colorTextButton]" :class="[open && 'rotate-180']" />
								</template>
							</UButton>
						</template>

						<template #item="{ item, index }">
							<p class="fm1 text-md md:text-base lg:text-lg" :style="colorText">
								{{ item.two }}
							</p>
							<div class="mt-5" :class="index + 1 < store.filteredFaq(store.searchingValue).length
			? 'border-b-2'
			: null
			" :style="[colorBorder]"></div>
						</template>
					</UAccordion>

					<!-- Sem FAQ -->
					<div v-else :style="colorText" class="flex flex-col justify-center items-center mt-20">
						<UIcon name="i-material-symbols-deployed-code-alert-outline-sharp" class="w-20 h-20" />
						<p>Não há FAQ cadastrado no momento!</p>
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

	<!-- Footer para contato -->
	<UContainer v-if="!app.config_will_have_hotsite" class="fixed bottom-0 left-0 right-0 px-0 md:px-4">
		<div class="py-6 px-4 bg-cover" :style="background">
			<div class="flex flex-col text-white relative z-10">
				<div class="max-w-[500px] m-auto">
					<p class="fm1 text-[10px] md:text-[14px] text-center mb-3" v-html="app.faq_text_tittle_footer"></p>
				</div>

				<div class="flex items-center justify-center">
					<NuxtLink target="_blank"
						:to="`https://wa.me/55${phone}?text=Ol%C3%A1%2C+preciso+de+ajuda+no+site+da+promo%C3%A7%C3%A3o%21`"
						class="flex items-center py-7">
						<UIcon name="i-mdi-whatsapp" class="text-3xl md:text-4xl lg:text-5xl" />
						<p class="fm3 px-2 text-[22px] md:text-[32px]" :style="colorText">
							<span>{{ app.config_text_phone_contact }}</span>
						</p>
					</NuxtLink>
				</div>

				<NuxtLink target="_self" :to="`mailto:${app.config_text_email_contact}`" class="flex items-center">
					<UIcon name="i-mdi-email-arrow-right-outline" class="text-3xl md:text-4xl lg:text-5xl" />
					<p class="fm3 text-center text-[14px] md:text-[20px] mt-1" :style="colorText">
						{{ app.config_text_email_contact }}
					</p>
				</NuxtLink>
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

// Personalização da tela
const colorText = computed(() => {
	if (app.config_will_have_hotsite) {
		return `color: ${app.colors_text_one_dark}`;
	} else {
		return `color: ${app.colors_text_one}`;
	}
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_two}`;
});

const colorBorder = computed(() => {
	return `border-color: ${app.colors_border_one}`;
});

const background = computed(() => {
	return `background-image: url('${pathAssets}${app.layout_background_footer_app}'), url('/imgs/fundo_modal_placeholder.png'); background-color: ${app.colors_background_one}`;
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
