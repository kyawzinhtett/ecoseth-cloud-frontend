<template>
    <aside class="hidden lg:block col-span-2 pt-6 h-screen">
        <ul>
            <li class="flex justify-center py-3 rounded-md mb-8">
                <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            </li>
            <li class="bg-primary flex justify-center py-3 rounded-md mb-8">
                <RouterLink :to="{ name: 'stake' }">Stake</RouterLink>
            </li>
            <li class="flex justify-center py-3 rounded-md mb-8">About us</li>
            <li class="flex justify-center py-3 rounded-md mb-8">Support</li>
        </ul>
    </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>