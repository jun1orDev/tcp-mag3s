import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';
import { useStoreCheckout } from '~/stores/checkout';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);
	const storeCheckout = useStoreCheckout(app.$pinia);

	storeIncentive.userAcountData.loading = false;
	await storeIncentive.userAccount(useToast);

	if (storeIncentive.userAcountData.name) {
		storeCheckout.formRegister.name = storeIncentive.userAcountData.name;
	}

	if (storeIncentive.userAcountData.phone.number) {
		storeCheckout.formRegister.phone.id = storeIncentive.userAcountData.phone.id;
		storeCheckout.formRegister.phone.number = storeIncentive.userAcountData.phone.number;
	}

	if (storeIncentive.userAcountData.cpf) {
		storeCheckout.formRegister.cpf = storeIncentive.userAcountData.cpf;
	}

	if (
		storeIncentive.userAcountData.name &&
		storeIncentive.userAcountData.number &&
		storeIncentive.userAcountData.cpf
	) {
		return navigateTo({
			path: '/checkout/pagamento',
			query: {
				idPkg: to.query.idPkg,
				idOB: to.query.idOB,
			},
		});
	}

	if (!useCookie('tokenUser').value) {
		return navigateTo({
			path: '/checkout/cadastro1',
			query: {
				idPkg: to.query.idPkg,
				idOB: to.query.idOB,
			},
		});
	}

	return;
});
