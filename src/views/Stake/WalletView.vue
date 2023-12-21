<template>
    <div class="h-screen">
        <section class="mt-8">
            <!-- <router-link :to="{ name: 'home' }">
            </router-link> -->
            <span class="text-gray">Home&nbsp;</span>
            <router-link :to="{ name: 'stake' }">
                <span class="text-gray">&nbsp;/&nbsp; Stake &nbsp; /</span>
            </router-link>
            <router-link :to="{ name: 'wallet' }">
                <span class="font-bold">&nbsp; Wallet</span>
            </router-link>
        </section>

        <h1 class="text-center font-bold text-3xl">Connect Wallet</h1>

        <section class="grid grid-cols-12 mt-12 gap-12">
            <div class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Coinbase</span>
                    <img src="/coinbase.svg" alt="Coinbase" class="w-[50px]">
                </div>
            </div>
            <div v-if="isMetamaskSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Metamask</span>
                    <img src="/metamask.svg" alt="Metamask" class="w-[50px]">
                </div>
            </div>
        </section>
        <section class="grid grid-cols-12 mt-12 gap-12">
            <div class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">OKX</span>
                    <img src="/okx.svg" alt="OKX" class="w-[50px]">
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Phantom</span>
                    <img src="/phantom.svg" alt="Phantom" class="w-[50px]">
                </div>
            </div>
        </section>
        <section class="grid grid-cols-12 mt-12 gap-12">
            <div class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Wallet Connect</span>
                    <img src="/wallet-connect.svg" alt="Wallet Connect" class="w-[50px]">
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Huobi</span>
                    <img src="/huobi.svg" alt="Huobi" class="w-[50px]">
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from '@/store/store.js'

const walletAddress = ref('')
const isMetamaskSupported = ref(false)
const router = new useRouter()
const store = new useStore()

onMounted(() => {
    isMetamaskSupported.value = window.ethereum != 'undefined'
})

const connectWallet = async () => {
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        walletAddress.value = accounts[0]

        store.setWalletAddress(walletAddress.value)

        router.push({ name: 'pool' })
    } catch (error) {
        console.error('Error connecting wallet:', error)
    }
}
</script>

<style scoped></style>