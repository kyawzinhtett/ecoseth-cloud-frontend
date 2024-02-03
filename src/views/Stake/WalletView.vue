<template>
    <div class="h-full pb-2 text-sm md:text-base">
        <section class="mt-6 md:mt-3 mb-8">
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
            <div class="hover:cursor-pointer w-full mb-3">
                <div @click="connectBscWallet"
                    class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Binance</span>
                    <img src="/binance.svg" alt="Binance" class="w-[40px] h-[40px]">
                </div>
            </div>
            <div class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet"
                    class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Coinbase</span>
                    <img src="/coinbase.svg" alt="Coinbase" class="w-[40px] h-[40px]">
                </div>
            </div>
        </section>
        <section class="md:flex md:mb-5 gap-5 md:gap-10">
            <div class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet"
                    class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Kraken</span>
                    <img src="/kraken.svg" alt="Kraken" class="w-[40px] h-[40px]">
                </div>
            </div>
            <div class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet"
                    class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Bybit</span>
                    <img src="/bybit.svg" alt="Bybit" class="w-[40px] h-[40px]">
                </div>
            </div>
        </section>
        <section class="md:flex md:mb-5 gap-5 md:gap-10">
            <div class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet"
                    class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">OKX</span>
                    <img src="/okx.svg" alt="OKX" class="w-[40px] h-[40px]">
                </div>
            </div>
            <div class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet"
                    class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Crypto.com</span>
                    <img src="/crypto.svg" alt="Crypto" class="w-[40px] h-[40px]">
                </div>
            </div>
        </section>
        <section class="md:flex md:mb-5 gap-5 md:gap-10">
            <div class="hover:cursor-pointer w-full mb-3">
                <div @click="connectWallet"
                    class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Metamask</span>
                    <img src="/metamask.svg" alt="Metamask" class="w-[40px] h-[40px]">
                </div>
            </div>
            <div class="hover:cursor-pointer w-full mb-3">
                <div @click="connectBscWallet"
                    class="bg-tertiary rounded-md flex justify-between items-center px-6 py-4 md:px-10 md:py-5">
                    <span class="text-xl md:text-2xl">Trustwallet</span>
                    <img src="/trust-wallet.svg" alt="Trustwallet" class="w-[40px] h-[40px]">
                </div>
            </div>
        </section>

        <Toast />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/store.js'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { Web3 } from 'web3'

const toast = useToast()
const web3 = new Web3(window.ethereum)
const store = new useStore()
const router = new useRouter()

const walletAddress = ref('')

const connectWallet = async () => {
    try {
        if (window.ethereum && window.ethereum.isMetaMask) {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            walletAddress.value = accounts[0]
            const balance = await web3.eth.getBalance(walletAddress.value)

            store.setWalletAddress(walletAddress.value)
            store.setWalletBalance(balance)

            router.push({ name: 'pool' })
        } else {
            toast.add({ severity: 'warn', detail: 'Please install Metamask.', life: 3000 })
        }
    } catch (error) {
        toast.add({ severity: 'warn', detail: 'Please install Metamask.', life: 3000 })
    }
}

const disconnectWallet = () => {
    store.setWalletAddress(null)

    router.push({ name: 'home' })
}

const connectBscWallet = async () => {
    try {
        if (window.BinanceChain !== 'undefined' && window.BinanceChain.isTrustWallet && !window.BinanceChain.isMetaMask) {
            const accounts = await window.BinanceChain.request({ method: 'eth_requestAccounts' })
            walletAddress.value = accounts[0]

            store.setWalletAddress(walletAddress.value)

            router.push({ name: 'pool' })
        } else {
            toast.add({ severity: 'warn', detail: 'Please install Trustwallet.', life: 3000 })
        }
    } catch (error) {
        toast.add({ severity: 'warn', detail: 'Please install Trustwallet.', life: 3000 })
    }
}
</script>

<style scoped></style>