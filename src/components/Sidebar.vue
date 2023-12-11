<template>
    <aside class="hidden lg:block col-span-2 pt-6 mt-20 h-screen">
        <ul>
            <router-link :to="{ name: 'home' }">
                <li class="flex justify-center py-5 rounded-md mb-10">
                    Home
                </li>
            </router-link>
            <router-link :to="{ name: 'stake' }">
                <li class="bg-primary flex justify-center py-5 rounded-md mb-10">
                    Stake
                </li>
            </router-link>
            <li class="flex justify-center py-5 rounded-md mb-10">About us</li>
            <li class="flex justify-center py-5 rounded-md mb-10">Support</li>
        </ul>
    </aside>
</template>

<script setup>
</script>

<style scoped></style>