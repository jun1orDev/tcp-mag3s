import { useStoreApp } from "~/stores/app";
import { useStoreIncentive } from "~/stores/incentive";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookieAuth = useCookie('tokenUser');
  const app = useNuxtApp();
  const storeApp = useStoreApp(app.$pinia);
  const storeIncentive = useStoreIncentive(app.$pinia);

  if (storeApp.contentApp.config_will_have_hotsite) {
    if (!cookieAuth.value) {
      storeIncentive.loading = true;
      return navigateTo({ path: '/login' });
    }

    storeIncentive.loading = false;
    return;
  }

  if (!cookieAuth.value) {
    const data = await storeIncentive.userLogin(false, useToast);
    if (data) {
      cookieAuth.value = data.access_token;
      return;
    }

    return navigateTo({ path: '/login' });
  }

  storeIncentive.loading = false;
  return;
});