<template>
  <!-- Header -->
  <Header />

  <template class="grid grid-cols-12">
    <template v-if="route.path !== '/wallet'">
      <Sidebar />
      <main class="col-span-12 lg:col-span-10 bg-secondary px-12 pt-9 mt-20 h-screen">
        <RouterView />
      </main>
    </template>
  </template>

  <template v-if="route.path === '/wallet'">
    <main class="bg-secondary px-12 pt-9 mt-10 h-screen">
      <RouterView />
    </main>
  </template>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()
</script>

<style scoped></style>