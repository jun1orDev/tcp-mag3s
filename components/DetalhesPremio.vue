<template>
	<div>
		<BackgroundDefault />
		<div class="h-screen">
			<img src="/imgs/exemplo_premio_01.png" class="justify-center m-auto w-[320px] md:w-[400px] mt-3" />
			<div class="flex flex-col items-center justify-center mt-2">
				<div v-if="hasScratchcard" class="flex items-center space-x-2">
					<img src="/imgs/rabiscadinha.png" class="w-[32px] md:w-[45px]" />
					<p class="titulo text-white text-[16px] md:text-[24px] ml-2">
						RABISCADINHA
					</p>
				</div>
				<div v-else class="flex items-center space-x-2">
					<p class="titulo text-white text-[10px] md:text-[14px]">
						Número premiado:
					</p>
				</div>
				<div class="flex items-center">
					<NumeroSorteio v-for="list in buttons" class="mt-2 mx-1" :button="list.button" :customBackground="list.color" />
				</div>

				<div class="sub text-white justify-center text-center mt-4 text-[10px] md:text-[14px]">
					<p>
						<span class="font-bold">Lembre-se:</span> mantenha seu cadastro
						sempre atualizado
					</p>
					<p>para nossa equipe poder entregar seu prêmio!</p>
				</div>
				<div class="Duvidas text-white text-[10px] md:text-[14px] mt-6">
					<p><span class="font-bold">Dúvidas?</span> É só entrar em contato:</p>
				</div>
				<div class="text-white flex items-center justify-center space-x-2">
					<img src="/imgs/whats.png" class="w-[32px] md:w-[48px] mt-2" />
					<p class="text-white contato text-[20px] md:text-[24px]">
						(11) 97485-1543
					</p>
				</div>
				<div class="mt-16">
					<p class="reembolso text-white text-[8px] md:text-[10px]">
						*Este item não é reembolsável.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
let hasScratchcard = false;
let buttons = ref([
	{ button: '01', color: '#DFA701' },
	{ button: '02', color: '#DFA701' },
	{ button: '03', color: '#DFA701' },
	{ button: '04', color: '#DFA701' },
	{ button: '05', color: '#DFA701' },
	{ button: '06', color: '#DFA701' },
	{ button: '07', color: '#DFA701' },
]);
</script>

<style scoped>
.titulo {
	font-family: 'Gotham Black';
}

.sub {
	font-family: 'Gotham Medium';
}

.duvidas {
	font-family: 'Gotham Medium';
}

.contato {
	font-family: 'Gotham Black';
}

.reembolso {
	font-family: 'Gotham Medium';
}
</style>
