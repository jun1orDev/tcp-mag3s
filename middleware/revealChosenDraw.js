import { useStoreApp } from '~/stores/app';
import { useStoreIncentive } from '~/stores/incentive';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const app = useNuxtApp();
	const storeApp = useStoreApp(app.$pinia);
	const storeIncentive = useStoreIncentive(app.$pinia);
	console.log(to.params.id, from);

	await storeIncentive.userInventory(useToast);
	await storeIncentive.lotteryDraws(useToast);
	storeIncentive.revealChosenDraw(to.params.id);
	return;
});
