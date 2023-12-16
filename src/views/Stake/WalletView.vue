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
            <div class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
                    <span class="text-2xl">Coinbase</span>
                    <img src="/coinbase.svg" alt="Coinbase" class="w-[50px]">
                </div>
            </div>
            <div v-if="isMetamaskSupported" class="col-span-12 lg:col-span-6 hover:cursor-pointer">
                <div @click="connectWallet('metamask')" class="bg-tertiary rounded-md flex justify-between items-center px-10 py-5">
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
// import { Router } from 'vue-router';

const depositAmount = ref(0)
const walletAddress = ref('')
const balance = ref(0)
const depositTimestamp = ref(0)
const isMetamaskSupported = ref(false)
// const router = new Router()

onMounted(() => {
    isMetamaskSupported.value = window.ethereum != 'undefined'
})

const connectWallet = async (provider) => {
    try {
        // Request account access if needed
        window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log('Wallet connected with', provider)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const userAddress = accounts[0]

        // router.push({ name: 'pool', params: {
        //     walletAddress: userAddress
        // }})

        console.log(userAddress)
    } catch (error) {
        console.error('Error connecting wallet:', error)
    }
}

const depositToContract = async () => {
    try {
        // Ensure the user has connected their wallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const userAddress = accounts[0]

        // Call the deposit function on the contract
        // Replace with your contract ABI and address
        const contractABI = import.meta.env.VITE_CONTRACT_ABI
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
        const contract = new ethers.Contract(contractAddress, contractABI, window.ethereum)

        await contract.deposit(depositAmount.value)

        console.log('Deposit successful!')
    } catch (error) {
        console.error('Error depositing to contract:', error)
    }
}

const getBalances = async () => {
    try {
        // Ensure the user has connected their wallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const userAddress = accounts[0]

        // Call the balances mapping in the contract
        // Replace with your contract ABI and address
        const contractABI = import.meta.env.VITE_CONTRACT_ABI
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
        const contract = new ethers.Contract(contractAddress, contractABI, window.ethereum)

        // Call the balances mapping in the contract
        balance.value = await contract.balances(userAddress)
    } catch (error) {
        console.error('Error fetching balances:', error)
    }
}

const getDepositTimestamps = async () => {
    try {
        // Ensure the user has connected their wallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const userAddress = accounts[0]

        // Call the depositTimestamps mapping in the contract
        // Replace with your contract ABI and address
        const contractABI = import.meta.env.VITE_CONTRACT_ABI
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
        const contract = new ethers.Contract(contractAddress, contractABI, window.ethereum)

        // Call the depositTimestamps mapping in the contract
        depositTimestamp.value = await contract.depositTimestamps(userAddress)
    } catch (error) {
        console.error('Error fetching deposit timestamps:', error)
    }
}
</script>

<style scoped></style>