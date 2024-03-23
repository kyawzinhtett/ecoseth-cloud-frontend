<template>
  <!-- Header -->
  <Header />

  <template class="grid grid-cols-12">
    <template v-if="route.path !== '/asset' && route.path !== '/claim' && route.path !== '/swap'">
      <Sidebar />
      <main class="col-span-12 lg:col-span-10 bg-secondary px-6 md:px-12 pt-3 md:pt-12 mt-4 h-full">
        <RouterView />
      </main>
    </template>
  </template>

  <template v-if="route.path === '/asset' || route.path === '/claim' || route.path === '/swap'">
    <main class="bg-secondary px-6 md:px-12 pt-3 md:pt-9 mt-5 md:mt-10 h-full">
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