<template>
    <div class="mt-6 text-sm md:text-base">
        <router-link v-if="walletAddress" :to="{ name: 'asset' }">
            <section class="flex justify-end items-center gap-2 mb-6">
                <Button class="btn-primary px-2 py-2 text-white">
                    <div class="flex gap-3">
                        <span class="text-xs">{{ walletAddress }}</span>
                        <i class="pi pi-wallet"></i>
                    </div>
                </Button>
            </section>
        </router-link>

        <router-link v-if="!walletAddress" :to="{ name: 'wallet' }">
            <section class="flex justify-end items-center gap-2 mb-6">
                <p>Wallet</p>
                <Button class="btn-primary px-2 py-2 text-white">
                    <div class="flex gap-3">
                        <span class="text-xs">{{ walletAddress }}</span>
                        <i class="pi pi-wallet"></i>
                    </div>
                </Button>
            </section>
        </router-link>
        <section class="flex justify-between items-center mb-5">
            <h1 class="text-lg md:text-xl font-semibold mb-3">Pool</h1>
            <Dropdown v-model="selectedOption" :options="options" optionLabel="name" placeholder="Select ..." class="md:px-3 bg-[#141414]" />
        </section>
        <section class="mb-5">
            <div class="bg-primary rounded-3xl flex justify-evenly py-3">
                <p @click="toggleCurrency('ETH')" :class="{ 'font-semibold': isEther }"
                    class="cursor-pointer hover:opacity-80">
                    Add ETH
                </p>
                <p @click="toggleCurrency('USDT')" :class="{ 'font-semibold': isUSDT }"
                    class="cursor-pointer hover:opacity-80">
                    Add USDT
                </p>
            </div>
        </section>
        <section class="flex justify-between mb-5 text-sm md:text-base">
            <p>1ETH = 1808.76 USDT</p>
            <p>APY <span class="text-indigo">4.5% - 4.8%</span></p>
        </section>
        <section class="mb-5">
            <div v-if="isEther" class="flex items-center gap-3 mb-3">
                <img src="/ether.svg" alt="Ether" class="w-[50px] h-[50px]">
                <p>ETH</p>
            </div>
            <div v-else-if="isUSDT" class="flex items-center gap-3 mb-3">
                <img src="/usdt.svg" alt="USDT" class="w-[50px] h-[50px]">
                <p>USDT</p>
            </div>
            <div v-if="isEther" class="md:flex items-center gap-3 mb-2">
                <InputText v-model="depositAmount" type="number" min="0"
                    class="bg-secondary border border-gray-700 w-full md:w-1/2 lg:w-1/3 p-3 mb-3"
                    placeholder="Enter unit in Wei" />
                <Button label="Max" class="btn-outline py-2" />
            </div>
            <div v-else-if="isUSDT" class="md:flex items-center gap-3 mb-2">
                <InputText v-model="usdtAmount" type="number" min="0"
                    class="bg-secondary border border-gray-700 w-full md:w-1/2 lg:w-1/3 p-3 mb-3"
                    placeholder="Enter USDT" />
                <Button label="Max" class="btn-outline py-2" />
            </div>
            <p v-if="walletAddress" class="text-xs">
                <span class="text-gray">Available Transfer: &nbsp&nbsp </span> {{ walletBalance }} ETH
            </p>
        </section>

        <section class="mb-6">
            <Card class="bg-secondary shadow-sm shadow-gray-900 text-white md:px-8">
                <template #title>
                    Details
                </template>
                <template #content>
                    <ul class="mt-3 text-sm md:text-base">
                        <li class="flex justify-between mb-3">
                            <p class="text-gray">Estimated APY:</p>
                            <p class="text-indigo">1.8%</p>
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
        <section v-if="isEther" class="flex justify-center mb-3">
            <Button @click="depositETH(depositAmount)" label="Add Liquidity" class="btn-primary text-xs md:text-base"
                :disabled="depositAmount === 0 || depositAmount === null" />
        </section>
        <section v-if="isUSDT" class="flex justify-center mb-3">
            <Button @click="depositUSDT(usdtAmount)" label="Add Liquidity" class="btn-primary text-xs md:text-base"
                :disabled="usdtAmount === 0 || usdtAmount === null" />
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Web3 } from 'web3'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import { useStore } from '@/store/store.js'
import { contractABI } from '@/contracts/contractConfig'
import axiosClient from '@/services/axiosClient'

const selectedOption = ref()
const options = ref([
    { name: 'ETH/USDT', code: 'ETH' },
    { name: 'TRX/USDT', code: 'TRX' }
])

const store = useStore()
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const web3 = new Web3(window.ethereum)
const contract = new web3.eth.Contract(contractABI, contractAddress)

const walletAddress = ref('')
const ownerAddress = ref('')
const walletBalance = ref()
const networkID = ref('')
const isEther = ref(true)
const isUSDT = ref(false)
const depositAmount = ref(null)
const usdtAmount = ref(null)

const toggleCurrency = (currency) => {
    if (currency === 'ETH') {
        isEther.value = true
        isUSDT.value = false
    } else if (currency === 'USDT') {
        isUSDT.value = true
        isEther.value = false
    }
}

const wallet = store.getWalletAddress

// Slice wallet address
walletAddress.value = wallet && wallet.slice(0, 4) + '...' + wallet.slice(-5)

onMounted(() => {
    getInfo()
})

// Get info
const getInfo = async () => {
    if (!wallet) {
        console.log('Please connect to your wallet!')
    } else {
        console.log('Wallet Connected!')
        // Get connected user address
        console.log(`User Address: ${wallet}`)

        // Get connected user balances
        const balance = await web3.eth.getBalance(wallet)
        walletBalance.value = web3.utils.fromWei(balance, 'ether')
        console.log(`User Balance: ${walletBalance.value}`)

        // Get contract owner address
        ownerAddress.value = await contract.methods.owner().call({ from: wallet })
        console.log(`Owner Address: ${ownerAddress.value}`)

        // Get network ID
        networkID.value = await window.ethereum.request({ method: 'eth_chainId' })
        console.log(`Connected to network with ID: ${networkID.value}`)
    }
}

// Deposit Eth
const depositETH = async (amount) => {
    // Ensure the user has connected their wallet
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const connectedUserAddress = accounts[0]

    if (wallet !== connectedUserAddress) {
        console.log('Please connect to your wallet!')
    } else {
        try {
            const receipt = await contract.methods.depositETH().send({
                from: wallet,
                value: amount,
            })

            if (receipt.status) {
                console.log('Deposit successful')

                // Reset deposit amount back to 0
                depositAmount.value = 0

                // Store wallet address & amount in DB
                const params = {
                    wallet: wallet,
                    real_balance: amount,
                    level: 1,
                };
                await axiosClient.post('/user-info', params)
            } else {
                console.error('Transaction failed!')
            }
        } catch (error) {
            console.error('Error during transaction:', error)
        }
    }
}

// Withdraw Eth
const withdrawETH = async (user, amount) => {
    // Ensure the user has connected their wallet
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const connectedUserAddress = accounts[0]

    if (wallet !== connectedUserAddress) {
        console.log('Please connect to your wallet!')
    } else {
        try {
            // Convert amount to Wei
            // const amountInWei = web3.utils.toWei(amount.toString(), 'ether')

            // Call the withdraw method on the contract
            const transaction = await contract.methods.withdrawETH(user, amount).send({
                from: wallet,
            })

            console.log('Withdrawal successful:', transaction)
        } catch (error) {
            console.error('Error withdrawing from contract:', error)
        }
    }
}

// Deposit USDT
const depositUSDT = async (amount) => {
    // Ensure the user has connected their wallet
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const connectedUserAddress = accounts[0];

    if (wallet !== connectedUserAddress) {
        console.log('Please connect to your wallet!');
    } else {
        try {
            const transaction = await contract.methods.depositUSDT(amount).send({
                from: wallet,
            });

            console.log('USDT Deposit successful:', transaction);

            // Reset deposit amount back to 0
            usdtAmount.value = 0
        } catch (error) {
            console.error('Error during USDT deposit:', error);
        }
    }
}

// Withdraw USDT
const withdrawUSDT = async (user, amount) => {
    // Ensure the user has connected their wallet
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const connectedUserAddress = accounts[0];

    if (wallet !== connectedUserAddress) {
        console.log('Please connect to your wallet!');
    } else {
        try {
            const transaction = await contract.methods.withdrawUSDT(user, amount).send({
                from: wallet,
            });

            console.log('USDT Withdrawal successful:', transaction);
        } catch (error) {
            console.error('Error during USDT withdrawal:', error);
        }
    }
}

</script>

<style scoped></style>