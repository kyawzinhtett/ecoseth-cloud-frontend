<template>
  <!-- Header -->
  <Header />
  <!-- SideBar -->
  <nav>
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'stake' }">Stake</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
</script>

<style scoped></style>
