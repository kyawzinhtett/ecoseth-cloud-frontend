<template>
    <div class="h-full py-2 text-sm md:text-base">
        <section class="mt-8 mb-8">
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

        <h1 class="text-center font-bold text-xl md:text-3xl">Connect Wallet</h1>

        <section class="md:flex mt-12 md:mb-5 gap-5 md:gap-10">
            <div v-if="isTrustWalletSupported" class="hover:cursor-pointer w-full mb-3">
                <div @click="connectBscWallet" class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Binance</span>
                    <img src="/binance.svg" alt="Binance" class="w-[40px] h-[40px]">
                </div>
            </div>
            <div v-if="isMetamaskSupported" class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Coinbase</span>
                    <img src="/coinbase.svg" alt="Coinbase" class="w-[40px] h-[40px]">
                </div>
            </div>
        </section>
        <section class="md:flex md:mb-5 gap-5 md:gap-10">
            <div v-if="isMetamaskSupported" class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Kraken</span>
                    <img src="/kraken.svg" alt="Kraken" class="w-[40px] h-[40px]">
                </div>
            </div>
            <div v-if="isMetamaskSupported" class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Bybit</span>
                    <img src="/bybit.svg" alt="Bybit" class="w-[40px] h-[40px]">
                </div>
            </div>
        </section>
        <section class="md:flex md:mb-5 gap-5 md:gap-10">
            <div v-if="isMetamaskSupported" class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">OKX</span>
                    <img src="/okx.svg" alt="OKX" class="w-[40px] h-[40px]">
                </div>
            </div>
            <div v-if="isMetamaskSupported" class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Crypto.com</span>
                    <img src="/crypto.svg" alt="Crypto" class="w-[40px] h-[40px]">
                </div>
            </div>
        </section>
        <section class="md:flex md:mb-5 gap-5 md:gap-10">
            <div v-if="isMetamaskSupported" class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet" class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Metamask</span>
                    <img src="/metamask.svg" alt="Metamask" class="w-[40px] h-[40px]">
                </div>
            </div>
            <div v-if="isTrustWalletSupported" class="hover:cursor-pointer w-full mb-3">
                <div @click="connectBscWallet" class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Trustwallet</span>
                    <img src="/trust-wallet.svg" alt="Trustwallet" class="w-[40px] h-[40px]">
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
    isMetamaskSupported.value = window.ethereum != 'undefined'
    isTrustWalletSupported.value = window.BinanceChain !== 'undefined'
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