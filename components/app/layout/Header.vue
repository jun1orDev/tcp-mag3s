<template>
	<div id="header-app" class="fixed w-full z-50 animate__animated" :style="textColor">
		<div class="bg-transparent py-2 lg:py-6">
			<UContainer class="flex justify-between items-center">
				<div>
					<LpImageBrand class="max-w-[110px] lg:max-w-[130px]" />
				</div>
				<div class="flex items-center">
					<p class="fm1 me-4 text-base">Olá, {{ storeIncentive.firstUserName }} </p>
					<UTooltip text="clique para sair" :popper="{ arrow: true, placement: 'bottom-end', offsetDistance: 10 }">
						<UIcon name="i-material-symbols-exit-to-app" class="w-6 h-6 cursor-pointer"
							@click="isOpenModal = !isOpenModal" />
					</UTooltip>
				</div>
			</UContainer>
		</div>
	</div>

	<!-- Modal para sair do aplicativo -->
	<UModal v-model="isOpenModal" :ui="configModal">
		<div id="modal-exit" class="flex flex-col items-center justify-center w-full px-4 py-8 border border-1"
			:style="[bgColorModal, textColor]">
			<h2 class="fm3 text-lg lg:text-xl">Tem certeza que deseja sair?</h2>
			<div class="fm2 grid grid-cols-2 gap-2 mt-6">
				<p class="cursor-pointer px-4 py-2 border border-1 rounded-md" @click="storeIncentive.userLogout(useToast)">sim
				</p>
				<p class="cursor-pointer px-4 py-2 border border-1 rounded-md" :style="emphasis" @click="isOpenModal = !isOpenModal">não</p>
			</div>
		</div>
	</UModal>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = useStoreApp().contentApp;
const storeIncentive = useStoreIncentive();

const isOpenModal = ref(false);

const configModal = ref({
	"base": 'bg-black rounded-none',
	"padding": 'p-0',
	"margin": 'my-0 sm:my-0',
	"overlay": { background: 'bg-black/80' },
});

const bgColor = computed(() => {
	return app.header_colors_background_app;
});

const bgColorModal = computed(() => {
	return `background-color: ${app.header_colors_background_app}`;
});

const textColor = computed(() => {
	return `color: ${app.header_colors_text_app}`;
});

const emphasis = computed(() => {
	return `color: ${app.colors_emphasis_active_and_hover}; border-color:${app.colors_emphasis_active_and_hover}`;
});

onMounted(() => {
	headerScrollStyle('header-app', 20, 'animate__fadeInDown');
});
</script>

<style>
#header-app.has-bg-color {
	background-color: v-bind(bgColor);
}

#modal-exit .emphasis {
	/* color: v-bind(colorEmphasis); */
}
</style>
