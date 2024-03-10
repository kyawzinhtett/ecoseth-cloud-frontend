<template>
    <div class="mt-4 text-sm md:text-base">

        <section class="flex justify-end items-center gap-2 mb-6">
            <template v-if="!account.address">
                <Button class="btn-primary px-2 py-2 text-white" @click="connect()">
                    <div class="flex justify-center gap-3">
                        <span class="text-xs">{{ loading.connecting ? 'Connecting...' : 'Wallet' }}</span>
                        <i class="pi pi-wallet"></i>
                    </div>
                </Button>
            </template>

            <template v-else>
                <router-link :to="{ name: 'asset' }">
                    <Button class="btn-primary px-2 py-2 text-white">
                        <div class="flex justify-center gap-3">
                            <span class="text-xs">{{ account.shortAddress }}</span>
                            <i class="pi pi-wallet"></i>
                        </div>
                    </Button>
                </router-link>

                <Button class="btn-primary px-2 py-2 text-white" @click="selectChain">
                    <div class="flex justify-center gap-3">
                        <span class="text-xs">Switch Network</span>
                    </div>
                </Button>

                <Button class="btn-primary px-2 py-2 text-white" @click="disconnect">
                    <div class="flex justify-center gap-3">
                        <span class="text-xs">{{ loading.logouting ? 'Disconnect...' : 'Disconnect' }}</span>
                    </div>
                </Button>
            </template>

        </section>

        <h1 class="text-lg md:text-xl font-semibold mb-3">Pool</h1>

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
                    class="bg-secondary border border-gray-700 w-full md:w-1/2 p-3 mb-3"
                    placeholder="Enter unit in Wei" />
            </div>
            <div v-else-if="isUSDT" class="md:flex items-center gap-3 mb-2">
                <InputText v-model="usdtAmount" type="number" min="0"
                    class="bg-secondary border border-gray-700 w-full md:w-1/2 p-3 mb-3" placeholder="Enter USDT" />
            </div>
            <p v-if="walletAddress && isEther" class="text-xs">
                <span class="text-gray">Available Transfer: &nbsp&nbsp </span> {{ walletBalance }} ETH
            </p>
        </section>

        <section class="mb-6">
            <Card v-if="isEther" class="bg-secondary shadow-sm shadow-gray-900 text-white md:px-8">

                <template #title>
                    Details
                </template>

                <template #content>
                    <ul class="mt-3 text-xs md:text-base">
                        <li class="flex justify-between mb-3">
                            <p class="text-gray">Estimated APY:</p>
                            <p v-if="ethApyAmount" class="text-indigo">{{ ethApyAmount }} %</p>
                            <p v-else>---</p>
                        </li>

                        <li class="flex justify-between mb-3">
                            <p class="text-gray">Estimated Principal:</p>
                            <p v-if="ethEstimatedPrincipal">{{ parseFloat(ethEstimatedPrincipal).toFixed(3) }} ETH</p>
                            <p v-else>---</p>
                        </li>

                        <li class="flex justify-between mb-3">
                            <p class="text-gray">Service Fees:</p>
                            <p v-if="setting.service_fees">{{ setting.service_fees }} USDT</p>
                            <p v-else>---</p>
                        </li>

                        <li class="flex justify-between">
                            <p class="text-gray">Estimated Earn:</p>
                            <p v-if="ethEstimatedEarn">{{ parseFloat(ethEstimatedEarn).toFixed(3) }} ETH per Month</p>
                            <p v-else>---</p>
                        </li>
                    </ul>
                </template>
            </Card>

            <Card v-if="isUSDT" class="bg-secondary shadow-sm shadow-gray-900 text-white md:px-8">

                <template #title>
                    Details
                </template>

                <template #content>
                    <ul class="mt-3 text-xs md:text-base">
                        <li class="flex justify-between mb-3">
                            <p class="text-gray">Estimated APY:</p>
                            <p v-if="usdtApyAmount" class="text-indigo">{{ usdtApyAmount }} %</p>
                            <p v-else>---</p>
                        </li>

                        <li class="flex justify-between mb-3">
                            <p class="text-gray">Estimated Principal:</p>
                            <p v-if="usdtEstimatedPrincipal">{{ parseFloat(usdtEstimatedPrincipal).toFixed(3) }} USDT
                            </p>
                            <p v-else>---</p>
                        </li>

                        <li class="flex justify-between mb-3">
                            <p class="text-gray">Service Fees:</p>
                            <p v-if="setting.service_fees">{{ setting.service_fees }} USDT</p>
                            <p v-else>---</p>
                        </li>

                        <li class="flex justify-between">
                            <p class="text-gray">Estimated Earn:</p>
                            <p v-if="usdtEstimatedEarn">{{ parseFloat(usdtEstimatedEarn).toFixed(3) }} USDT per Month
                            </p>
                            <p v-else>---</p>
                        </li>
                    </ul>
                </template>
            </Card>
        </section>
        <section v-if="isEther" class="flex justify-center mb-3">
            <Button @click="depositETH(ethAmount)" label="Add Liquidity" class="btn-primary text-xs md:text-base"
                :disabled="ethAmount === 0 || ethAmount === null || isEthBtnClicked" />
        </section>
        <section v-if="isUSDT" class="flex justify-center mb-3">
            <Button @click="depositUSDT(usdtAmount)" label="Add Liquidity" class="btn-primary text-xs md:text-base"
                :disabled="usdtAmount === 0 || usdtAmount === null || isUsdtBtnClicked" />
        </section>
    </div>
    <Toast class="z-10" />
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { Web3 } from 'web3'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useStore } from '@/store/store.js'
import { contractABI } from '@/contracts/contractConfig'
import { tokenABI } from '@/contracts/tokenABI'
import axiosClient from '@/services/axiosClient'
import {
    $off,
    $on,
    Events,
    account,
    chain,
    getAvailableChains,
    connect as masterConnect,
    disconnect as masterDisconnect,
    switchChain as masterSwitchChain,
    selectChain
} from '@kolirt/vue-web3-auth'

const toast = useToast()
const store = useStore()
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const tokenAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS
const web3 = new Web3(window.ethereum)
const contract = new web3.eth.Contract(contractABI, contractAddress)
const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)

const loading = reactive({
    connecting: false,
    connectingTo: {},
    switchingTo: {},
    logouting: false
})
const levels = ref([])
const setting = ref([])
const walletAddress = ref('')
const walletBalance = ref()
const isEther = ref(true)
const isUSDT = ref(false)
const ethAmount = ref(null)
const usdtAmount = ref(null)
const ethApyAmount = ref(null)
const ethEstimatedPrincipal = ref(null)
const ethEstimatedEarn = ref(null)
const usdtApyAmount = ref(null)
const usdtEstimatedPrincipal = ref(null)
const usdtEstimatedEarn = ref(null)
const isEthBtnClicked = ref(false)
const isUsdtBtnClicked = ref(false)

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
    // toast.add({ severity: 'success', detail: 'Wallet Connected!', life: 3000 })
}

// Wallet Disconnect
const disconnect = async () => {
    loading.logouting = true

    const handler = () => {
        loading.logouting = false
        $off(Events.Disconnected, handler)
    }

    $on(Events.Disconnected, handler)

    await masterDisconnect().catch(() => {
        loading.logouting = false
        $off(Events.Disconnected, handler)
    })
}

watch(account, async (account) => {
    walletAddress.value = account.address
    store.setWalletAddress(walletAddress.value)

    if (walletAddress.value) {
        const balance = await web3.eth.getBalance(walletAddress.value)
        walletBalance.value = web3.utils.fromWei(balance, 'ether')
    }
})

watch(chain, async (chain) => {
    const balance = await web3.eth.getBalance(walletAddress.value)
    walletBalance.value = web3.utils.fromWei(balance, 'ether')
})

const toggleCurrency = (currency) => {
    if (currency === 'ETH') {
        isEther.value = true
        isUSDT.value = false
    } else if (currency === 'USDT') {
        isUSDT.value = true
        isEther.value = false
    }
}

onMounted(() => {
    getLevel()
    getSetting()
})

const getLevel = async () => {
    const response = await axiosClient.get('/level')
    levels.value = response.data.data
}

const getSetting = async () => {
    const response = await axiosClient.get('/home-assets')
    setting.value = response.data.setting
}

// Deposit Eth
const depositETH = async (amount) => {
    // Ensure the user has connected their wallet
    if (!walletAddress.value) {
        console.log('Please connect to your wallet!')
        toast.add({ severity: 'warn', detail: 'Please connect to your wallet!', life: 3000 })
    } else {
        try {
            isEthBtnClicked.value = true
            // Convert amount to Wei
            const amountInEth = web3.utils.toWei(amount.toString(), 'ether')

            const receipt = await contract.methods.depositETH().send({
                from: walletAddress.value,
                value: amountInEth,
            })

            if (receipt.status) {
                const balance = await web3.eth.getBalance(wallet)
                walletBalance.value = web3.utils.fromWei(balance, 'ether')

                toast.add({ severity: 'success', detail: 'ETH Deposit Successful!', life: 3000 })

                // Reset deposit amount back to 0
                ethAmount.value = 0

                // Store wallet address & amount in DB
                const params = {
                    wallet: walletAddress.value,
                    real_balance: amount,
                    level: 1,
                    type: 'eth'
                }

                await axiosClient.post('/user-info', params)
                isEthBtnClicked.value = false
            } else {
                isEthBtnClicked.value = false

                toast.add({ severity: 'warn', detail: 'Transaction failed!', life: 3000 })
                console.error('Transaction failed!')
            }
        } catch (error) {
            isEthBtnClicked.value = false

            toast.add({ severity: 'warn', detail: 'Transaction failed!', life: 3000 })
            console.error('Error during transaction:', error)
        }
    }
}

// Deposit USDT
const depositUSDT = async (amount) => {
    if (!walletAddress.value) {
        console.log('Please connect to your wallet!')
        toast.add({ severity: 'warn', detail: 'Please connect to your wallet!', life: 3000 })
    } else {
        try {
            isUsdtBtnClicked.value = true

            // Approve the spender to spend the specified amount of USDT tokens
            const tx = await tokenContract.methods.approve(contractAddress, amount).send({ from: walletAddress.value });

            if (tx.transactionHash) {
                const transaction = await contract.methods.depositUSDT(amount).send({
                    from: walletAddress.value,
                })

                if (transaction) {
                    toast.add({ severity: 'success', detail: 'USDT Deposit successful!', life: 3000 })
                }

                // Reset deposit amount back to 0
                usdtAmount.value = 0

                const params = {
                    wallet: walletAddress.value,
                    real_balance: amount,
                    level: 1,
                    type: 'usdt'
                }
                await axiosClient.post('/user-info', params)
            } else {
                toast.add({ severity: 'warn', detail: 'Error during USDT deposit!', life: 3000 })
            }

            isUsdtBtnClicked.value = false
        } catch (error) {
            isUsdtBtnClicked.value = false

            toast.add({ severity: 'warn', detail: 'Error during USDT deposit!', life: 3000 })
            console.error('Error during USDT deposit:', error)
        }
    }
}

watch(ethAmount, () => {
    if (ethAmount.value) {
        let isConditionMet = false;

        levels.value.Eth.forEach(level => {
            if (!isConditionMet && parseFloat(ethAmount.value) >= parseFloat(level.min_amount) && parseFloat(ethAmount.value) <= parseFloat(level.max_amount)) {
                isEthBtnClicked.value = false;
                ethApyAmount.value = level.percentage;
                ethEstimatedPrincipal.value = ethAmount.value * (ethApyAmount.value / 100);
                ethEstimatedEarn.value = ethEstimatedPrincipal.value / 12;

                isConditionMet = true;
            }
        });

        if (!isConditionMet) {
            isEthBtnClicked.value = true;
            ethApyAmount.value = null;
            ethEstimatedPrincipal.value = null;
            ethEstimatedEarn.value = null;
        }
    } else {
        isEthBtnClicked.value = true;
        ethApyAmount.value = null;
        ethEstimatedPrincipal.value = null;
        ethEstimatedEarn.value = null;
    }
});

watch(usdtAmount, () => {
    if (usdtAmount.value) {
        let isConditionMet = false;

        levels.value.Usdt.forEach(level => {
            if (!isConditionMet && parseFloat(usdtAmount.value) >= parseFloat(level.min_amount) && parseFloat(usdtAmount.value) <= parseFloat(level.max_amount)) {
                isUsdtBtnClicked.value = false;
                usdtApyAmount.value = level.percentage;
                usdtEstimatedPrincipal.value = usdtAmount.value * (usdtApyAmount.value / 100);
                usdtEstimatedEarn.value = usdtEstimatedPrincipal.value / 12;

                isConditionMet = true;
            }
        });

        if (!isConditionMet) {
            isUsdtBtnClicked.value = true;
            usdtApyAmount.value = null;
            usdtEstimatedPrincipal.value = null;
            usdtEstimatedEarn.value = null;
        }
    } else {
        isUsdtBtnClicked.value = true;
        usdtApyAmount.value = null;
        usdtEstimatedPrincipal.value = null;
        usdtEstimatedEarn.value = null;
    }
});

</script>

<style scoped></style>