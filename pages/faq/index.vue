<template>
	<div>
		<UContainer>
			<AppLayoutBgDefault />
			<AppOthersCampoPesquisa inputPlaceholder="Qual é a sua dúvida?" class="mt-14" />
			<UAccordion
				:items="items"
				color="yellow"
				variant="outline"
				size="sm"
				class="mt-10"
			/>
		</UContainer>

		<div
			class="p-9 justify-end fixed bottom-0 left-0 right-0 bg-cover"
		>
			<div class="flex flex-col">
				<p class="text text-white text-[10px] md:text-[14px] text-center mb-3">
					<span class="font-bold">Dúvidas?</span> É só entrar em contato com a
					gente através do <br />
					WhatsApp ou pelo nosso e-mail. Estamos aqui pra te ajudar!
				</p>
			</div>
			<div class="flex justify-center">
				<img src="/imgs/whatsapp.png" class="w-[32px]" />
				<p class="phone text-white ml-2 text-[20px] lg:text-[24px]">
					(11) 97485-1543
				</p>
			</div>
			<div>
				<p class="email text-white text-center text-[14px] md:text-[20px] mt-1">falae@fieldasorte.com.br</p>
			</div>
		</div>
	</div>
</template>

<script setup>
const items = [
	{
		label: 'Por que precisam do meu CPF?',
		defaultOpen: true,
		content:
			'O número do CPF é solicitado para que seja possível te identificar individualmente, tornando intransferível seu direito aos prêmios que você ganhar.',
		class: 'mt-5',
	},
	{
		label: 'Meus dados bancários estão seguros?',
		defaultOpen: true,
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
		class: 'mt-5',
	},
	{
		label: 'Meus dados estão seguros?',
		defaultOpen: true,
		content: 'sim sim sim sim',
		class: 'mt-5',
	},
];
</script>

<style scoped>
.text{
	font-family: 'Gotham Medium';
}

.phone, .email{
	font-family: 'Gotham Black';
}
</style>
