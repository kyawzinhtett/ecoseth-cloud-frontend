<template>
    <div class="h-screen">
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
            <div v-if="isTrustWalletSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectBscWallet" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Binance</span>
                    <img src="/binance.svg" alt="Binance" class="w-[50px]">
                </div>
            </div>
            <div v-if="isMetamaskSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Coinbase</span>
                    <img src="/coinbase.svg" alt="Coinbase" class="w-[50px]">
                </div>
            </div>
        </section>
        <section class="grid grid-cols-12 mt-12 gap-12">
            <div v-if="isMetamaskSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Kraken</span>
                    <img src="/kraken.svg" alt="Kraken" class="w-[50px]">
                </div>
            </div>
            <div v-if="isMetamaskSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Bybit</span>
                    <img src="/bybit.svg" alt="Bybit" class="w-[50px]">
                </div>
            </div>
        </section>
        <section class="grid grid-cols-12 mt-12 gap-12">
            <div v-if="isMetamaskSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">OKX</span>
                    <img src="/okx.svg" alt="OKX" class="w-[50px]">
                </div>
            </div>
            <div v-if="isMetamaskSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Crypto.com</span>
                    <img src="/crypto.svg" alt="Crypto" class="w-[50px]">
                </div>
            </div>
        </section>
        <section class="grid grid-cols-12 mt-12 gap-12">
            <div v-if="isMetamaskSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Metamask</span>
                    <img src="/metamask.svg" alt="Metamask" class="w-[50px]">
                </div>
            </div>
            <div v-if="isTrustWalletSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectBscWallet" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Trustwallet</span>
                    <img src="/trust-wallet.svg" alt="Trustwallet" class="w-[50px]">
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/store.js'

const walletAddress = ref('')
const isMetamaskSupported = ref(false)
const isTrustWalletSupported = ref(false)
const router = new useRouter()
const store = new useStore()

onMounted(() => {
    isMetamaskSupported.value = window.ethereum != 'undefined' && window.ethereum.isMetaMask
    isTrustWalletSupported.value = window.BinanceChain !== 'undefined' && window.BinanceChain.isTrustWallet && !window.BinanceChain.isMetaMask
})

const connectWallet = async () => {
    try {
        if (window.ethereum && window.ethereum.isMetaMask) {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            walletAddress.value = accounts[0]

            store.setWalletAddress(walletAddress.value)

            router.push({ name: 'pool' })
        } else {
            console.error('Metamask is not detected. Please install Metamask.')
        }
    } catch (error) {
        console.error('Error connecting wallet:', error)
    }
}

const connectBscWallet = async () => {
    try {
        if (window.BinanceChain !== 'undefined' && window.BinanceChain.isTrustWallet && !window.BinanceChain.isMetaMask) {
            const accounts = await window.BinanceChain.request({ method: 'eth_requestAccounts' })
            walletAddress.value = accounts[0]

            store.setWalletAddress(walletAddress.value)

            router.push({ name: 'pool' })
        } else {
            console.error('Trustwallet is not detected. Please install Trustwallet.')
        }
    } catch (error) {
        console.error('Error connecting Binance Wallet:', error)
    }
}
</script>

<style scoped></style>