<template>
    <div class="mt-4 text-sm md:text-base">
        <template v-if="walletAddress">
            <section class="flex justify-end items-center gap-2 mb-6">
                <router-link v-if="walletAddress" :to="{ name: 'asset' }">
                    <Button class="btn-primary px-2 py-2 text-white">
                        <div class="flex gap-3">
                            <span class="text-xs">{{ walletAddress }}</span>
                            <i class="pi pi-wallet"></i>
                        </div>
                    </Button>
                </router-link>

                <Button class="btn-primary px-2 py-2 text-white" @click="disconnectWallet">
                    <span class="text-xs">Disconnect</span>
                </Button>
            </section>
        </template>

        <template v-else-if="!walletAddress">
            <section class="flex justify-end items-center gap-2 mb-6">
                <router-link :to="{ name: 'wallet' }">
                    <Button class="btn-primary px-2 py-2 text-white">
                        <div class="flex justify-center gap-3">
                            <span class="text-xs">Wallet</span>
                            <i class="pi pi-wallet"></i>
                        </div>
                    </Button>
                </router-link>
            </section>
        </template>

        <section class="flex justify-between items-center mb-5">
            <h1 class="text-lg md:text-xl font-semibold mb-3">Pool</h1>
            <Dropdown v-model="selectedOption" :options="options" optionLabel="name" placeholder="Select ..."
                class="md:px-3 bg-[#141414]" />
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
                <InputText v-model="ethAmount" type="number" min="0"
                    class="bg-secondary border border-gray-700 w-full md:w-1/2 p-3 mb-3" placeholder="Enter unit in Wei" />
            </div>
            <div v-else-if="isUSDT" class="md:flex items-center gap-3 mb-2">
                <InputText v-model="usdtAmount" type="number" min="0"
                    class="bg-secondary border border-gray-700 w-full md:w-1/2 p-3 mb-3" placeholder="Enter USDT" />
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
                    <ul class="mt-3 text-xs md:text-base">
                        <template v-if="apyAmount">
                            <li class="flex justify-between mb-3">
                                <p class="text-gray">Estimated APY:</p>
                                <p class="text-indigo">{{ apyAmount }} %</p>
                            </li>
                        </template>
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
            <Button @click="depositETH(ethAmount)" label="Add Liquidity" class="btn-primary text-xs md:text-base"
                :disabled="ethAmount === 0 || ethAmount === null" />
        </section>
        <section v-if="isUSDT" class="flex justify-center mb-3">
            <Button @click="depositUSDT(usdtAmount)" label="Add Liquidity" class="btn-primary text-xs md:text-base"
                :disabled="usdtAmount === 0 || usdtAmount === null" />
        </section>
    </div>
    <Toast class="z-10" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Web3 } from 'web3'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
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

const levels = ref([])
const walletAddress = ref('')
const ownerAddress = ref('')
const walletBalance = ref()
const networkID = ref('')
const isEther = ref(true)
const isUSDT = ref(false)
const ethAmount = ref(null)
const usdtAmount = ref(null)
const apyAmount = ref(null)

const toggleCurrency = (currency) => {
    if (currency === 'ETH') {
        isEther.value = true
        isUSDT.value = false
    } else if (currency === 'USDT') {
        isUSDT.value = true
        isEther.value = false
    }
}

const wallet = localStorage.getItem('walletAddress') || store.getWalletAddress
const balance = localStorage.getItem('walletBalance') || store.getWalletBalance

// Slice wallet address
walletAddress.value = wallet && wallet.slice(0, 4) + '...' + wallet.slice(-5)

onMounted(() => {
    getInfo()
    getLevel()
    checkExpiration()
})

// Get info
const getInfo = async () => {
    if (!wallet) {
        console.log('Please connect to your wallet!')
    } else if (!store.walletConnectedToastShown) {
        toast.add({ severity: 'success', detail: 'Wallet Connected!', life: 3000 })
        store.setWalletConnectedToastShown()

        console.log('Wallet Connected!')

        // Get connected user balances
        walletBalance.value = web3.utils.fromWei(balance, 'ether')
        console.log(`User Balance: ${walletBalance.value}`)
    } else {
        // Get connected user address
        console.log(`User Address: ${wallet}`)

        // Get connected user balances
        walletBalance.value = web3.utils.fromWei(balance, 'ether')
        console.log(`User Balance: ${walletBalance.value}`)

        // Get contract owner address
        ownerAddress.value = await contract.methods.getOwners().call({ from: wallet })
        console.log(`Owner Address: ${ownerAddress.value}`)

        // Get network ID
        networkID.value = await window.ethereum.request({ method: 'eth_chainId' })
        console.log(`Connected to network with ID: ${networkID.value}`)
    }
}

const getLevel = async () => {
    const response = await axiosClient.get('/level')
    levels.value = response.data.data
}

// Deposit Eth
const depositETH = async (amount) => {
    // Ensure the user has connected their wallet
    if (!wallet) {
        console.log('Please connect to your wallet!')
        toast.add({ severity: 'warn', detail: 'Please connect to your wallet!', life: 3000 })
    } else {
        try {
            // Convert amount to Wei
            const amountInEth = web3.utils.toWei(amount.toString(), 'ether')

            const receipt = await contract.methods.depositETH().send({
                from: wallet,
                value: amountInEth,
            })

            if (receipt.status) {
                localStorage.removeItem('walletBalance')

                const balance = await web3.eth.getBalance(wallet)
                localStorage.setItem('walletBalance', balance)
                store.setWalletBalance(balance)
                walletBalance.value = web3.utils.fromWei(balance, 'ether')

                console.log('Deposit successful')
                toast.add({ severity: 'success', detail: 'ETH Deposit Successful!', life: 3000 })

                // Reset deposit amount back to 0
                ethAmount.value = 0

                // Store wallet address & amount in DB
                const params = {
                    wallet: wallet,
                    real_balance: amount,
                    level: 1,
                }
                await axiosClient.post('/user-info', params)
            } else {
                toast.add({ severity: 'warn', detail: 'Transaction failed!', life: 3000 })
                console.error('Transaction failed!')
            }
        } catch (error) {
            toast.add({ severity: 'warn', detail: 'Transaction failed!', life: 3000 })
            console.error('Error during transaction:', error)
        }
    }
}

// Deposit USDT
const depositUSDT = async (amount) => {
    if (!wallet) {
        console.log('Please connect to your wallet!')
        toast.add({ severity: 'warn', detail: 'Please connect to your wallet!', life: 3000 })
    } else {
        try {
            const transaction = await contract.methods.depositUSDT(amount).send({
                from: wallet,
            })

            if (transaction) {
                toast.add({ severity: 'success', detail: 'USDT Deposit successful!', life: 3000 })
            }

            console.log('USDT Deposit successful:', transaction)

            // Reset deposit amount back to 0
            usdtAmount.value = 0

            const params = {
                wallet: wallet,
                real_balance: amount,
                level: 1,
            }
            await axiosClient.post('/user-info', params)
        } catch (error) {
            toast.add({ severity: 'warn', detail: 'Error during USDT deposit!', life: 3000 })
            console.error('Error during USDT deposit:', error)
        }
    }
}

watch(ethAmount, () => {
    if (ethAmount.value && parseFloat(ethAmount.value) >= (levels.value)[0].min_amount) {
        levels.value.forEach(level => {
            if (parseFloat(ethAmount.value) >= level.min_amount && parseFloat(ethAmount.value) <= level.max_amount) {
                apyAmount.value = level.percentage
            }
        })
    } else {
        apyAmount.value = null
    }
})

const disconnectWallet = () => {
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('walletBalance')

    store.setWalletAddress(null)
    store.setWalletBalance(null)

    toast.add({ severity: 'success', detail: 'Wallet Disconnected!', life: 3000 })

    location.reload()
}

const checkExpiration = () => {
    const storedTimestamp = localStorage.getItem('walletTimestamp')
    if (storedTimestamp) {
        const currentTime = new Date().getTime()
        const timeDifference = currentTime - parseInt(storedTimestamp)

        const expirationTime = 24 * 60 * 60 * 1000

        if (timeDifference > expirationTime) {
            localStorage.removeItem('walletAddress')
            localStorage.removeItem('walletBalance')
            localStorage.removeItem('walletTimestamp')
        }
    }
}

</script>

<style scoped></style>