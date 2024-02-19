<template>
  <!-- Header -->
  <Header />

  <template class="grid grid-cols-12">
    <template
      v-if="route.path !== '/wallet' && route.path !== '/asset' && route.path !== '/claim' && route.path !== '/swap'">
      <Sidebar />
      <main class="col-span-12 lg:col-span-10 bg-secondary px-6 md:px-12 pt-3 md:pt-12 mt-4 h-full">
        <RouterView />
      </main>
    </template>
  </template>

  <template
    v-if="route.path === '/wallet' || route.path === '/asset' || route.path === '/claim' || route.path === '/swap'">
    <main class="bg-secondary px-6 md:px-12 pt-3 md:pt-9 mt-5 md:mt-10 h-full">
      <RouterView />
    </main>
  </template>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()

onMounted(() => {
  checkExpiration()
})

const checkExpiration = () => {
  const storedTimestamp = localStorage.getItem('walletTimestamp')
  if (storedTimestamp) {
    const currentTime = new Date().getTime()
    const timeDifference = currentTime - parseInt(storedTimestamp)

    const expirationTime = 24 * 60 * 60 * 1000

    if (timeDifference > expirationTime) {
      localStorage.removeItem('walletAddress')
      localStorage.removeItem('walletBalance')
      localStorage.removeItem('walletTimestamp')
    }
  }
}
</script>

<style scoped></style>