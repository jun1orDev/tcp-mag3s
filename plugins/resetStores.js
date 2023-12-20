import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtPlugin((nuxt) => {
	const store = useStoreApp(nuxt.$pinia);
	const storeIncentive = useStoreIncentive(nuxt.$pinia);

	addRouteMiddleware(
		'reset-stores',
		async (to, from) => {
			// Validação de usuário se não estiver logado
			if (!useCookie('tokenUser').value){
				// Incentive Store
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
			}
		},
		{ global: true }
	);
});
