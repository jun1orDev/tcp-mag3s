import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';
import { useStoreCheckout } from '~/stores/checkout';

export default defineNuxtPlugin((nuxt) => {
	const store = useStoreApp(nuxt.$pinia);
	const storeIncentive = useStoreIncentive(nuxt.$pinia);
	const storeCheckout = useStoreCheckout(nuxt.$pinia);

	addRouteMiddleware(
		'reset-stores',
		async (to, from) => {
			// Validação de usuário se não estiver logado
			if (!useCookie('tokenUser').value) {
				// Incentive Store (User Acount)
				storeIncentive.userAcountData.loading = false;
				storeIncentive.userAcountData.name = '';
				storeIncentive.userAcountData.email = '';
				storeIncentive.userAcountData.status = null;
				storeIncentive.userAcountData.cpf = null;
				storeIncentive.userAcountData.phone = null;
				storeIncentive.userAcountData.addresses = null;
				storeIncentive.userAcountData.paymentMethods.status = null;
				storeIncentive.userAcountData.paymentMethods.id = null;
				storeIncentive.userAcountData.paymentMethods.number = null;
				storeIncentive.userAcountData.paymentMethods.name = null;
				storeIncentive.userAcountData.paymentMethods.validity = null;
				storeIncentive.userAcountData.paymentMethods.cvv = null;

				// Incentive Store (User Acount)
				storeIncentive.inventory.loading = false;
				storeIncentive.inventory.userId = null;
				storeIncentive.inventory.luckyNumbers = [];

				// Checkout Store (Form Register)
				storeCheckout.formRegister.cpf = null;
				storeCheckout.formRegister.email = null;
				storeCheckout.formRegister.name = null;
				storeCheckout.formRegister.phone = null;
				storeCheckout.formRegister.creditCard.status = null;
				storeCheckout.formRegister.creditCard.number = null;
				storeCheckout.formRegister.creditCard.name = null;
				storeCheckout.formRegister.creditCard.validity = null;
				storeCheckout.formRegister.creditCard.cvv = null;
			}
		},
		{ global: true }
	);
});
