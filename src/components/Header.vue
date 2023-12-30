<template>
    <header class="fixed top-0 w-full bg-gradient px-6 py-2 z-10">
        <h1 class="header-text text-2xl">
            <router-link :to="{ name: 'home' }">
                EcosEth Cloud
            </router-link>
        </h1>
        <p>
            <router-link :to="{ name: 'home' }">
                Decentralized Staking Protocol
            </router-link>
        </p>
    </header>
</template>

<script setup>

</script>

<style scoped></style>