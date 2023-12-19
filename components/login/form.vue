<template>
	<div>
		<UForm id="formLogin" :validate="validate" :state="state" class="space-y-4"
			@submit="storeIncentive.userLogin(useToast, true, props.isCheckout)">
			<UFormGroup label="Seu e-mail" name="email">
				<UInput size="xl" icon="i-material-symbols-person-check-outline-rounded" v-model="storeIncentive.formLogin.user"
					type="text" color="white" variant="outline" :ui="configInput" />
			</UFormGroup>

			<UFormGroup label="Sua senha" name="password">
				<UInput size="xl" icon="i-material-symbols-passkey-outline-rounded" v-model="storeIncentive.formLogin.password"
					type="password" color="white" :ui="configInput" />
				<p class="text-center mt-4">Esqueceu sua senha? <NuxtLink to="/recuperar-senha" class="fm3 decoration-solid">
						Clique aqui</NuxtLink>
				</p>
			</UFormGroup>

			<div class="flex justify-center">
				<UButton size="xl" label="entrar" type="submit" :ui="configButton" :style="[colorBgButton, colorTextButton]"
					class="fm3" :disabled="disabledButton" :loading="!storeIncentive.loading" trailing />
			</div>
		</UForm>
	</div>
</template>

<script setup>
import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

const store = useStoreApp();
const app = store.contentApp;
const storeIncentive = useStoreIncentive();
const { pathAssets } = useRuntimeConfig().public;

const props = defineProps(['isCheckout'])

const disabledButton = computed(() => {
	return !storeIncentive.formLogin.user || !storeIncentive.formLogin.password
});

const colorBgButton = computed(() => {
	return `background-color: ${app.colors_background_button_hotsite}`;
});

const colorTextButton = computed(() => {
	return `color: ${app.colors_text_button_hotsite}`;
});

const configInput = ref({
	"rounded": 'rounded-full',
});

const configButton = ref({
	"rounded": 'rounded-full',
	"padding": {
		"xl": "px-16 py-2.5"
	},
});
</script>

<style lang="scss" scoped></style>
