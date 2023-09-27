<template>
  <div>
    <p class="text-4xl text-amber-700">página inicial</p>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <ul>
     <li v-for="user in users">{{ user }}</li>
    </ul>
  </div>
</template>

<script setup>
const { data: users } = await useFetch('/api/users')
</script>

<style>

</style>
