<template>
	<div class="container py-30 text-stone-50">
		<div class="grid grid-cols-1 md:grid-cols-2 auto-rows-min md:auto-rows-auto md:min-h-screen items-center">
			<div class="flex justify-center">
				<img class="w-5/12 sm:w-4/12 md:w-auto" src="/imgs/mag3s.jpeg" alt="Logo Mag3s" />
			</div>
			<div>
				<form class="md:w-80">
					<h1 class="mb-4 text-xl">Bem-vindo, faça o login:</h1>

					<!-- E-mail -->
					<div class="flex flex-col mb-6">
						<label for="email" class="mb-1">E-mail:</label>

						<UInput id="email" name="email" type="email" color="gray" placeholder="Digite seu e-mail" size="xl"
							v-model="store.login.email" :ui="{ icon: { trailing: { pointer: '' } } }"
							icon="i-material-symbols-account-circle-outline" />
					</div>

					<!-- Password -->
					<div class="flex flex-col">
						<label for="password" class="mb-1">Senha:</label>
						<UInput id="password" name="password" color="gray" placeholder="Digite sua senha" :type="passView" size="xl"
							v-model="store.login.password" :ui="{ icon: { trailing: { pointer: '' } } }"
							icon="i-material-symbols-password-rounded">
							<template #trailing>
								<UButton v-show="store.login.password !== ''" color="primary" variant="link" :icon="passIcon"
									:padded="false" @click="togglePassView" />
							</template>
						</UInput>
					</div>

					<!-- Button -->
					<div class="flex justify-end">
						<UButton label="fazer login" color="black" variant="solid" size="lg" :loading="store.loading"
							:trailing="false" :disabled="!store.login.email || !store.login.password" class="mt-8 md:mt-4"
							:block="false" @click="store.loggingIn(useToast)" icon="i-material-symbols-login-rounded" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';

definePageMeta({
	middleware: ["login"]
});

const store = useStoreAdmin();
const toast = useToast();
const passView = ref('password');
const passIcon = ref('i-material-symbols-visibility-rounded');

function togglePassView() {
	switch (passView.value) {
		case 'password':
			passView.value = 'text'
			passIcon.value = 'i-material-symbols-visibility-off-rounded'
			break

		default:
			passView.value = 'password'
			passIcon.value = 'i-material-symbols-visibility-rounded'
			break
	}
}

useHead({
	bodyAttrs: {
		class: 'bg-gradient-to-r from-cyan-500 to-blue-500',
	},
})

onMounted(() => {
	if (store.logout) {
		toast.add({
			id: 'show_status_logout',
			color: `red`,
			title: `Atenção`,
			icon: `i-material-symbols-warning-outline-rounded`,
			description: `Faça o Login para Continuar`,
			timeout: 3500,
		});

		store.logout = false;
	}
})
</script>
