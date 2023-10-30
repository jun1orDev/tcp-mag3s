<template>
	<div class="px-6 py-3 border hover:border-green-500 rounded-lg cursor-pointer shadow-md transition-shadow ease-in-out duration-500"
		@click="store.filterPerTag(id, name)" :class="colorButtonClick">
		<p class="text-sm">{{ name }}</p>
	</div>
</template>

<script setup>
import { useStoreAdmin } from '~/stores/admin';

const store = useStoreAdmin();
const props = defineProps(['tag']);

let { id, name, filter } = toRefs(props.tag);

const colorButtonClick = ref({
	'bg-green-400': filter,
	'text-neutral-50': filter,
	'font-semibold': filter,
});

</script>

<style lang="css" scoped></style>
