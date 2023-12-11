<template>
  <!-- Header -->
  <Header />

  <template class="grid grid-cols-12">
    <Sidebar />

    <main class="col-span-12 lg:col-span-10 bg-secondary px-12 pt-9 mt-20">
      <RouterView />
    </main>
  </template>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<style scoped></style>