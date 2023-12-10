<template>
    <aside class="hidden lg:block col-span-2 pt-6 mt-20 h-screen">
        <ul>
            <li class="flex justify-center py-5 rounded-md mb-10">
                <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            </li>
            <li class="bg-primary flex justify-center py-5 rounded-md mb-10">
                <RouterLink :to="{ name: 'stake' }">Stake</RouterLink>
            </li>
            <li class="flex justify-center py-5 rounded-md mb-10">About us</li>
            <li class="flex justify-center py-5 rounded-md mb-10">Support</li>
        </ul>
    </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>