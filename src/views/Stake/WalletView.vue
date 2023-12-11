<template>
    <div>
        <section class="mt-8">
            <router-link :to="{ name: 'home' }">
                <span class="text-gray">Home&nbsp;</span>
            </router-link>
            <router-link :to="{ name: 'stake' }">
                <span class="text-gray">&nbsp;/&nbsp; Stake &nbsp; /</span>
            </router-link>
            <router-link :to="{ name: 'wallet' }">
                <span class="font-bold">&nbsp; Wallet</span>
            </router-link>
        </section>

        <h1 class="text-center font-bold text-3xl">Connect Wallet</h1>

        <section class="grid grid-cols-12 mt-12 gap-12">
            <div class="col-span-12 lg:col-span-6">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Coinbase</span>
                    <img src="/coinbase.svg" alt="Coinbase" class="w-[50px]">
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Metamask</span>
                    <img src="/metamask.svg" alt="Metamask" class="w-[50px]">
                </div>
            </div>
        </section>
        <section class="grid grid-cols-12 mt-12 gap-12">
            <div class="col-span-12 lg:col-span-6">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">OKX</span>
                    <img src="/okx.svg" alt="OKX" class="w-[50px]">
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Phantom</span>
                    <img src="/phantom.svg" alt="Phantom" class="w-[50px]">
                </div>
            </div>
        </section>
        <section class="grid grid-cols-12 mt-12 gap-12">
            <div class="col-span-12 lg:col-span-6">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Wallet Connect</span>
                    <img src="/wallet-connect.svg" alt="Wallet Connect" class="w-[50px]">
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Huobi</span>
                    <img src="/huobi.svg" alt="Huobi" class="w-[50px]">
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Breadcrumb from 'primevue/breadcrumb'

const home = ref({
    label: 'Home'
});
const items = ref([
    { label: 'Stake' },
    { label: 'Wallet' }
]);
</script>

<style scoped></style>