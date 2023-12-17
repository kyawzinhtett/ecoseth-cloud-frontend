<template>
    <router-link :to="{ name: 'wallet' }">
        <section class="flex justify-end items-center gap-2 mb-6">
            <p v-if="!walletAddress">Wallet</p>
            <Button class="btn-primary px-2 py-2 text-white">
                <div class="flex gap-3">
                    <span class="text-xs">{{ walletAddress }}</span>
                    <i class="pi pi-wallet"></i>
                </div>
            </Button>
        </section>
    </router-link>
    <section class="flex justify-between mb-5">
        <h1 class="text-xl font-semibold mb-3">Pool</h1>
        <Dropdown v-model="selectedOption" :options="options" optionLabel="name" placeholder="Select ..." class="px-3" />
    </section>
    <section class="mb-5">
        <div class="bg-primary rounded-3xl flex justify-evenly py-3">
            <p>Add ETH</p>
            <p class="font-bold">Add USDT</p>
        </div>
    </section>
    <section class="flex justify-between mb-5">
        <p>1ETH = 1808.76 USDT</p>
        <p>APY <span class="text-purple">4.5% - 4.8%</span></p>
    </section>
    <section class="mb-5">
        <div class="flex items-center gap-3 mb-3">
            <img src="/ellipse.svg" alt="Ellipse" class="w-[50px]">
            <p>USDT</p>
        </div>
        <div class="flex items-center gap-3 mb-2">
            <InputText type="text" class="bg-secondary border border-gray-700 w-1/3 py-4" />
            <Button label="Max" class="btn-outline" />
        </div>
        <p class="text-xs">
            <span class="text-gray">Available Transfer: &nbsp;&nbsp; </span> 700.31 USDT
        </p>
    </section>
    <section class="mb-6">
        <Card class="bg-secondary shadow-sm shadow-gray-900 text-white px-8">
            <template #title>
                Details
            </template>
            <template #content>
                <ul class="mt-3">
                    <li class="flex justify-between mb-3">
                        <p class="text-gray">Estimated APY:</p>
                        <p class="text-purple">1.8%</p>
                    </li>
                    <li class="flex justify-between mb-3">
                        <p class="text-gray">Estimated Principal:</p>
                        <p>350 USD</p>
                    </li>
                    <li class="flex justify-between mb-3">
                        <p class="text-gray">Liquidity:</p>
                        <p>350 USD</p>
                    </li>
                    <li class="flex justify-between mb-3">
                        <p class="text-gray">Service Fees:</p>
                        <p>35 USDT</p>
                    </li>
                    <li class="flex justify-between">
                        <p class="text-gray">Estimated Earn:</p>
                        <p>2.4523 USDT per month</p>
                    </li>
                </ul>
            </template>
        </Card>
    </section>
    <section class="flex justify-center mb-3">
        <Button label="Add Liquidity" class="btn-primary" />
    </section>
</template>

<script setup>
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import { ref, onMounted } from 'vue'
import { useStore } from '@/store/store.js'
import { Web3 } from 'web3'
// import { ethers } from 'ethers'

const web3 = new Web3(window.ethereum)
// const provider = new ethers.providers.Web3Provider(window.ethereum)

const store = useStore()

const walletAddress = ref('')

const wallet = store.getWalletAddress

walletAddress.value = wallet && wallet.slice(0, 4) + '...' + wallet.slice(-5)
console.log(`Wallet Address: ${walletAddress.value}`)

const selectedOption = ref()
const options = ref([
    { name: 'ETH/USDT', code: 'ETH' },
    { name: 'TRX/USDT', code: 'TRX' }
])

const items = ref([
    { label: 'Add ETH' },
    { label: 'Add USDT' }
])

onMounted(() => {
    getWalletBalance()
})



const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "depositTimestamps",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getWalletAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const userAccount = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

// web3.eth.getBalance(userAccount).then(result => console.log(result))


// const contract = new ethers.Contract(contractAddress, contractABI, provider)

const getWalletBalance = async () => {
    try {


        await window.ethereum.enable()
        console.log(`Account: ${await web3.eth.getAccounts()}`)
        
        const b = await web3.eth.getBalance(userAccount)
        console.log(`Balance: ${b}`)







        // Ensure the user has connected their wallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const connectedUserAddress = accounts[0]

        const contract = new web3.eth.Contract(contractABI, contractAddress)
        // console.log(contract.methods);
        // console.log(contract.methods.getUserBalance(userAccount))

        const balances = await contract.methods.getUserBalance(userAccount).call({ from: userAccount })

        console.log(balances)
    } catch (error) {
        console.error('Error depositing to contract:', error)
    }
}
</script>

<style scoped></style>