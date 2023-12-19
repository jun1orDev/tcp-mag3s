import { useStoreApp } from '~/stores/app';
import { useStoreCheckout } from '~/stores/checkout';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);
	const storeCheckout = useStoreCheckout(app.$pinia);

	await storeIncentive.userAccount(useToast);

	// Preencher os dados de cartão de crédito nos inputs caso já tenha cadastrado
	if (storeIncentive.userAcountData.paymentMethods.status) {
		storeCheckout.formRegister.creditCard.number =
			storeIncentive.userAcountData.paymentMethods.number;
		storeCheckout.formRegister.creditCard.name =
			storeIncentive.userAcountData.paymentMethods.name;
		storeCheckout.formRegister.creditCard.validity =
			storeIncentive.userAcountData.paymentMethods.validity;
		storeCheckout.formRegister.creditCard.cvv =
			storeIncentive.userAcountData.paymentMethods.cvv;
		storeCheckout.formRegister.creditCard.status =
			storeIncentive.userAcountData.paymentMethods.status;
	}

	if (!useCookie('tokenUser').value) {
		return navigateTo({
			path: '/checkout/pacotes',
		});
	}

	return;
});
