<template>
  <!-- Header -->
  <Header />

  <div class="grid grid-cols-12">
    <!-- SideBar -->
    <Sidebar />

    <!-- Main -->
    <main class="col-span-12 lg:col-span-10 px-4 bg-[#090909]">

    </main>
  </div>

  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<style scoped></style>
