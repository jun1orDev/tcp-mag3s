<template>
	<div class="position-sticky">
		<div class="bg-zinc-700 py-2">
			<UContainer class="flex justify-between items-center">
				<div>
					<img width="40" src="/imgs/mag3s.jpeg" alt="" srcset="">
				</div>
				<div>
					<UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
						<UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" class="cursor-pointer" />
					</UDropdown>
				</div>
			</UContainer>
		</div>
	</div>
</template>

<script setup>
const router = useRouter();
const cookieAuth = useCookie('idUser');
const items = [
	[
		{
			label: 'Sair',
			icon: 'i-material-symbols-logout-rounded',
			click: () => {
				// Logout
				cookieAuth.value = null;
				router.push({ path: '/admin/login' });
			}
		},
	]
]
</script>

<style scoped></style>
