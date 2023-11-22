<template>
	<div v-show="!storeIncentive.loading">
		<AppLayoutBgDefault />
		<div class="h-screen w-screen">
			<img :src="storeIncentive.gamification.choosePrizeDetails.image" class="justify-center m-auto w-[320px] md:w-[400px] mt-3" />
			<div class="flex flex-col items-center justify-center mt-2">
				<div v-if="storeIncentive.gamification.choosePrizeDetails.typePrize === 'ScratchCard'" class="flex items-center space-x-2">
					<img src="/imgs/rabiscadinha.png" class="w-[32px] md:w-[45px]" />
					<p class="fm3 text-white text-[16px] md:text-[24px] ml-2">
						RABISCADINHA
					</p>
				</div>
				<div v-else>
					<div class="flex items-center space-x-2">
						<p class="fm3 text-white text-[10px] md:text-[14px]">
							Número premiado:
						</p>
					</div>
					<!-- <div class="flex items-center">
						<AppGameNumberDraw v-for="drawToday in storeIncentive.drawnNumbersToday" :numberDraw="drawToday.number"
						:status="drawToday.status" />
					</div> -->
				</div>

				<div class="fm1 text-white justify-center text-center mt-4 text-[10px] md:text-[14px]">
					<p>
						<span class="font-bold">Lembre-se:</span> mantenha seu cadastro
						sempre atualizado
					</p>
					<p>para nossa equipe poder entregar seu prêmio!</p>
				</div>
				<div class="fm1 text-white text-[10px] md:text-[14px] mt-6">
					<p><span class="font-bold">Dúvidas?</span> É só entrar em contato:</p>
				</div>
				<div class="text-white flex items-center justify-center space-x-2">
					<img src="/imgs/whats.png" class="w-[32px] md:w-[48px] mt-2" />
					<p class="text-white fm3 text-[20px] md:text-[24px]">
						(11) 97485-1543
					</p>
				</div>
				<div class="mt-16">
					<p class="fm1 text-white text-[8px] md:text-[10px]">
						*Este item não é reembolsável.
					</p>
				</div>
			</div>
		</div>
	</div>

	<AppLayoutLoading v-if="storeIncentive.loading" />
</template>

<script setup>
import { useStoreIncentive } from '~/stores/incentive';

const storeIncentive = useStoreIncentive();

definePageMeta({
	middleware: process.client ? ['auth-user', 'choose-prize-details'] : undefined
});
</script>

<style scoped></style>
