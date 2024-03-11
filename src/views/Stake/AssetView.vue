<template>
    <div class="md:px-20 h-screen">
        <Card class="mt-4 bg-secondary rounded-md border border-gray-600 text-sm md:text-base">
            <template #subtitle>
                <div class="flex justify-between items-center md:mx-12">
                    <div class="flex items-center gap-3">
                        <img src="/usdt.svg" alt="USDT" class="w-[24px]">
                        <h1 class="text-white text-lg font-bold">USDT</h1>
                    </div>
                    <router-link :to="{ name: 'claim', params: { address: wallet } }">
                        <button class="btn-primary text-sm px-4 py-2 md:px-10 md:py-3">Claim</button>
                    </router-link>
                </div>
            </template>
            <template #content>
                <section class="md:mx-12">
                    <div class="md:flex justify-between items-center mb-6">
                        <div class="md:leading-8">
                            <span class="text-xs">Statistics</span>
                            <p v-if="usdtStats" class="text-white">{{ parseFloat(usdtStats).toFixed(3) }} USDT</p>
                            <p v-else>---</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Frozen</span>
                            <p v-if="frozenUsdt" class="text-white">{{ parseFloat(frozenUsdt).toFixed(3) }} USDT</p>
                            <p v-else>---</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Available</span>
                            <p v-if="availableUsdt" class="text-white">{{ parseFloat(availableUsdt).toFixed(3) }} USDT
                            </p>
                            <p v-else>---</p>
                        </div>
                    </div>
                </section>
            </template>
        </Card>

        <Card class="mt-4 bg-secondary rounded-md border border-gray-600 text-sm md:text-base">
            <template #subtitle>
                <div class="flex justify-between items-center md:mx-12">
                    <div class="flex items-center gap-3">
                        <img src="/ether.svg" alt="Ether" class="w-[24px]">
                        <h1 class="text-white text-lg font-bold">ETH</h1>
                    </div>
                    <router-link :to="{ name: 'swap', params: { address: wallet } }">
                        <button class="btn-primary text-sm px-4 py-2 md:px-10 md:py-3">Swap</button>
                    </router-link>
                </div>
            </template>
            <template #content>
                <section class="md:mx-12">
                    <div class="md:flex justify-between items-center mb-6">
                        <div class="md:leading-8">
                            <span class="text-xs">Statistics</span>
                            <p v-if="ethStats" class="text-white">{{ parseFloat(ethStats).toFixed(3) }} ETH</p>
                            <p v-else>---</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Frozen</span>
                            <p v-if="frozenEth" class="text-white">{{ parseFloat(frozenEth).toFixed(3) }} ETH</p>
                            <p v-else>---</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Available</span>
                            <p v-if="availableEth" class="text-white">{{ parseFloat(availableEth).toFixed(3) }} ETH</p>
                            <p v-else>---</p>
                        </div>
                    </div>
                </section>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import axiosClient from '@/services/axiosClient'
import { useRoute } from 'vue-router'

const route = useRoute()

const userStats = ref([])
const ethStats = ref(null)
const usdtStats = ref(null)
const frozenEth = ref(null)
const frozenUsdt = ref(null)
const availableEth = ref(null)
const availableUsdt = ref(null)

const wallet = route.params.address

onMounted(() => {
    getUserStats()
})

const getUserStats = async () => {
    const response = await axiosClient.get(`/get-wallet-data/${wallet}`)
    userStats.value = response.data.user_stats

    ethStats.value = userStats.value.stats.statistics_eth
    usdtStats.value = userStats.value.stats.statistics_usdt
    frozenEth.value = userStats.value.stats.frozen_eth
    frozenUsdt.value = userStats.value.stats.frozen_usdt

    availableEth.value = userStats.value.profits.total_profit_eth
    availableUsdt.value = userStats.value.profits.total_profit_usdt
}
</script>

<style scoped></style>