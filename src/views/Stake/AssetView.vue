<template>
    <div class="md:px-20 h-screen">
        <!-- <Card class="mt-4 bg-secondary rounded-md border border-gray-600 text-sm md:text-base">
            <template #subtitle>
                <div class="flex justify-between items-center md:mx-12">
                    <h1 class="text-white text-lg font-bold">USDT</h1>
                    <p class="text-xs">APY <span class="text-indigo">8%</span></p>
                </div>
            </template>
            <template #content>
                <section class="md:mx-12">
                    <div class="md:flex justify-between items-center mb-6">
                        <div class="md:leading-8">
                            <span class="text-xs">Principal</span>
                            <p class="text-white">2,567.84 USD</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Liquidity</span>
                            <p class="text-white">4,785.31 USD</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Liquidity Price</span>
                            <p class="text-white">4,785.31 USD</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Pool Liquidity</span>
                            <p class="text-white">4.8931 USDT</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Earn</span>
                            <p class="text-white">58.4190 USDT</p>
                        </div>
                    </div>
                    <p class="mb-2 text-sm">Claimable</p>
                    <div class="md:flex gap-4 items-center">
                        <p class="text-indigo mr-6 mb-3">3.793 USDT</p>
                        <router-link :to="{ name: 'claim' }">
                            <button class="btn-primary text-sm mr-2">Claim</button>
                        </router-link>
                        <button class="btn-outline text-sm">Add</button>
                    </div>
                </section>
            </template>
        </Card> -->

        <Card class="mt-4 bg-secondary rounded-md border border-gray-600 text-sm md:text-base">
            <template #subtitle>
                <div class="flex justify-between items-center md:mx-12">
                    <div class="flex items-center gap-3">
                        <img src="/usdt.svg" alt="USDT" class="w-[24px]">
                        <h1 class="text-white text-lg font-bold">USDT</h1>
                    </div>
                    <router-link :to="{ name: 'claim' }">
                        <button class="btn-primary text-sm px-4 py-2 md:px-10 md:py-3">Claim</button>
                    </router-link>
                </div>
            </template>
            <template #content>
                <section class="md:mx-12">
                    <div class="md:flex justify-between items-center mb-6">
                        <div class="md:leading-8">
                            <span class="text-xs">Statistics</span>
                            <p class="text-white">{{ usdtStats }} USD</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Frozen</span>
                            <p class="text-white">{{ frozenUsdt }} USD</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Available</span>
                            <p class="text-white">4,785.31 USD</p>
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
                    <router-link :to="{ name: 'swap' }">
                        <button class="btn-primary text-sm px-4 py-2 md:px-10 md:py-3">Swap</button>
                    </router-link>
                </div>
            </template>
            <template #content>
                <section class="md:mx-12">
                    <div class="md:flex justify-between items-center mb-6">
                        <div class="md:leading-8">
                            <span class="text-xs">Statistics</span>
                            <p class="text-white">{{ ethStats }} ETH</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Frozen</span>
                            <p class="text-white">{{ frozenEth }} ETH</p>
                        </div>
                        <div class="md:leading-8">
                            <span class="text-xs">Available</span>
                            <p class="text-white">4,785.31 USD</p>
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

const userStats = ref([])
const ethStats = ref(null)
const usdtStats = ref(null)
const frozenEth = ref(null)
const frozenUsdt = ref(null)

const wallet = localStorage.getItem('walletAddress') || store.getWalletAddress

onMounted(() => {
    getUserStats()
})

const getUserStats = async () => {
    const response = await axiosClient.get(`/get-wallet-data/${wallet}`)
    userStats.value = response.data.user_stats

    userStats.value.stats.forEach(item => {
        ethStats.value = item.statistics_eth
        usdtStats.value = item.statistics_usdt
        frozenEth.value = item.frozen_eth
        frozenUsdt.value = item.frozen_usdt
    })
}
</script>

<style scoped></style>