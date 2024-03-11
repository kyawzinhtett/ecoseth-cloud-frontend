<template>
    <div class="h-screen md:px-8">
        <Card class="mt-4 bg-secondary rounded-md text-sm md:text-base">
            <template #content>
                <section class="md:mx-12">
                    <section>
                        <div class="mb-8">
                            <div class="mb-2">
                                <label class="text-sm text-gray flex items-center justify-between" for="address">
                                    <p class="text-xl font-bold">From</p>
                                    <div class="flex items-center gap-2">
                                        <img src="/ether.svg" alt="Ether" class="w-[50px] h-[50px]">
                                        <p>ETH</p>
                                    </div>
                                </label>
                            </div>
                            <InputText v-model="ethAmount" type="number" min="0"
                                class="bg-secondary border border-gray-700 w-full p-3 rounded-md text-white"
                                placeholder="Please enter amount" :disabled="walletBalance === '0'" />

                            <section class="flex justify-between mb-5 text-sm md:text-base mt-3">
                                <p v-if="walletBalance" class="text-xs">
                                    Available transfer: <span class="text-white font-bold">{{
                                parseFloat(walletBalance).toFixed(3) }} ETH</span>
                                </p>
                                <p v-if="setting.usdt_exchange_rate" class="text-xs text-white">
                                    1ETH = {{ setting.usdt_exchange_rate }} USDT
                                </p>
                            </section>
                        </div>

                        <div class="mb-4 flex justify-center">
                            <button @click="fetchAll"
                                class="flex items-center gap-2 btn-primary px-6 md:px-12 rounded-3xl text-xs md:text-base">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4">
                                    <path
                                        d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z"
                                        fill="#ffffff" />
                                </svg>
                                <p>All</p>
                            </button>
                        </div>

                        <div class="mb-12">
                            <InputText v-model="usdtAmount"
                                class="bg-secondary border border-gray-700 w-full p-3 rounded-md mb-2 text-white"
                                disabled />
                            <div>
                                <label class="text-sm text-gray flex items-center justify-between" for="address">
                                    <p class="text-xl font-bold">To</p>
                                    <div class="flex items-center gap-2">
                                        <img src="/usdt.svg" alt="USDT" class="w-[50px] h-[50px]">
                                        <p>USDT</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="flex justify-center">
                            <Button @click="handleSwap"
                                :disabled="ethAmount === '' || ethAmount === '0' || ethAmount === null || isClicked"
                                label="Exchange" class="btn-primary text-xs md:text-base md:px-24" />
                        </div>
                    </section>
                </section>
            </template>
        </Card>
    </div>
    <Toast class="z-10" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Web3 } from 'web3'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useRoute } from 'vue-router'
import axiosClient from '@/services/axiosClient'

const web3 = new Web3(window.ethereum)
const route = useRoute()
const toast = useToast()
const walletBalance = ref()
const setting = ref([])
const ethAmount = ref(null)
const usdtAmount = ref(0)
const userStats = ref([])
const isClicked = ref(false)

const wallet = route.params.address

onMounted(() => {
    getSetting()
    getUserStats()
})

const getSetting = async () => {
    const response = await axiosClient.get('/home-assets')
    setting.value = response.data.setting
}

const getUserStats = async () => {
    const response = await axiosClient.get(`/get-wallet-data/${wallet}`)
    userStats.value = response.data.user_stats
    walletBalance.value = userStats.value.profits.total_profit_eth
}

const fetchAll = () => {
    ethAmount.value = parseFloat(walletBalance.value).toFixed(3)
    usdtAmount.value = parseFloat(walletBalance.value * setting.value.usdt_exchange_rate).toFixed(3)
}

const handleSwap = async () => {
    const params = {
        eth: ethAmount.value,
        usdt: usdtAmount.value
    }

    const response = await axiosClient.post(`/swap-usdt/${wallet}`, params)

    if (response && response.data) {
        ethAmount.value = null
        usdtAmount.value = 0
        getUserStats()

        toast.add({ severity: 'success', detail: 'Swap Success!', life: 3000 })
    } else {
        toast.add({ severity: 'error', detail: 'Swap Fail!', life: 3000 })
    }
}

watch(ethAmount, () => {
    if (parseFloat(ethAmount.value) <= parseFloat(walletBalance.value)) {
        isClicked.value = false

        usdtAmount.value = parseFloat(ethAmount.value * setting.value.usdt_exchange_rate).toFixed(3)
    } else {
        isClicked.value = true

        usdtAmount.value = 0
    }
})


</script>

<style scoped></style>