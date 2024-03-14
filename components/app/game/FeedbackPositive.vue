<template>
	<div class="flex justify-center fixed top-0 right-0 left-0 bottom-0 min-h-screen bg-stone-950/95">
		<div class="flex flex-around items-center h-screen">
			<div class="block">
				<img src="/imgs/exemplo_premio_01.png" class="block w-auto h-screen max-h-[500px] py-8" />
			</div>
			<div class="flex ml-10">
				<div class="justify-start">
					<p class="title text-[#DFA701] text-[20px] md:text-[36px] whitespace-nowrap leading-5 md:leading-9 mb-4">
						PARABÉNS,<br />VOCÊ GANHOU!
					</p>
					<p class="subtitle text-[10px] lg:text-[14px] text-white mb-4">
						<span class="font-bold">Lembre-se:</span> mantenha seu cadastro
						sempre atualizado <br />
						pra nossa equipe poder entregar seu prêmio!
					</p>
					<p class="doubts text-[10px] lg:text-[14px] text-white mb-2">
						<span class="font-bold">Dúvidas?</span> É só entrar em contato:
					</p>
					<div class="flex">
						<UIcon name="i-mdi-whatsapp" class="text-3xl md:text-4xl lg:text-5xl" />
						<p class="phone text-white ml-2 text-[20px] lg:text-[24px]">
							(11) 97485-1543
						</p>
					</div>
				</div>
			</div>
			<AppOthersButton />
			<AppOthersClose />
		</div>
	</div>
</template>

<script setup>
const isClosed = ref(false);
</script>

<style scoped>
.title,
.phone {
	font-family: 'Gotham Black';
}

.subtitle,
.doubts {
	font-family: 'Gotham Medium';
}
</style>
