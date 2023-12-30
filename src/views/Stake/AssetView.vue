<template>
    <div class="px-20 pb-10">
        <Card class="mt-8 bg-grey rounded-md">
            <template #subtitle>
                <h1 class="text-white text-lg font-bold mx-12 pt-3">Overall</h1>
            </template>
            <template #content>
                <div class="flex justify-between items-center mx-12">
                    <div class="leading-8">
                        <span class="text-xs">Principal</span>
                        <p class="text-white">2,567.84 USD</p>
                    </div>
                    <div class="leading-8">
                        <span class="text-xs">Liquidity</span>
                        <p class="text-white">4,785.31 USD</p>
                    </div>
                    <div class="leading-8">
                        <span class="text-xs">Earn</span>
                        <p class="text-white">58.4190 USDT</p>
                    </div>
                    <div class="leading-8">
                        <span class="text-xs">Claimable</span>
                        <p class="text-white">4.8931 USDT</p>
                    </div>
                    <router-link :to="{ name: 'claim' }">
                        <button class="btn-primary px-5 text-sm">Claim All</button>
                    </router-link>
                </div>
            </template>
        </Card>

        <Card class="mt-8 bg-secondary rounded-md border border-gray-600">
            <template #subtitle>
                <div class="flex justify-between">
                    <h1 class="text-white text-lg font-bold mx-12 pt-3">ETH/USDT</h1>
                    <p class="text-xs">APY <span class="text-indigo">8%</span></p>
                </div>
            </template>
            <template #content>
                <section class="mx-12">
                    <div class="flex justify-between items-center mb-6">
                        <div class="leading-8">
                            <span class="text-xs">Principal</span>
                            <p class="text-white">2,567.84 USD</p>
                        </div>
                        <div class="leading-8">
                            <span class="text-xs">Liquidity</span>
                            <p class="text-white">4,785.31 USD</p>
                        </div>
                        <div class="leading-8">
                            <span class="text-xs">Liquidity Price</span>
                            <p class="text-white">4,785.31 USD</p>
                        </div>
                        <div class="leading-8">
                            <span class="text-xs">Pool Liquidity</span>
                            <p class="text-white">4.8931 USDT</p>
                        </div>
                        <div class="leading-8">
                            <span class="text-xs">Earn</span>
                            <p class="text-white">58.4190 USDT</p>
                        </div>
                    </div>
                    <p class="mb-2 text-sm">Claimable</p>
                    <div class="flex gap-4 items-center">
                        <p class="text-indigo mr-6">3.793 USDT</p>
                        <router-link :to="{ name: 'claim' }">
                            <button class="btn-primary text-sm">Claim</button>
                        </router-link>
                        <button class="btn-outline text-sm">Add</button>
                    </div>
                </section>
            </template>
        </Card>

        <Card class="mt-8 bg-secondary rounded-md border border-gray-600">
            <template #subtitle>
                <div class="flex justify-between">
                    <h1 class="text-white text-lg font-bold mx-12 pt-3">TRX/USDT</h1>
                    <p class="text-xs">APY <span class="text-indigo">8%</span></p>
                </div>
            </template>
            <template #content>
                <section class="mx-12">
                    <div class="flex justify-between items-center mb-6">
                        <div class="leading-8">
                            <span class="text-xs">Principal</span>
                            <p class="text-white">2,567.84 USD</p>
                        </div>
                        <div class="leading-8">
                            <span class="text-xs">Liquidity</span>
                            <p class="text-white">4,785.31 USD</p>
                        </div>
                        <div class="leading-8">
                            <span class="text-xs">Liquidity Price</span>
                            <p class="text-white">4,785.31 USD</p>
                        </div>
                        <div class="leading-8">
                            <span class="text-xs">Pool Liquidity</span>
                            <p class="text-white">4.8931 USDT</p>
                        </div>
                        <div class="leading-8">
                            <span class="text-xs">Earn</span>
                            <p class="text-white">58.4190 USDT</p>
                        </div>
                    </div>
                    <p class="mb-2 text-sm">Claimable</p>
                    <div class="flex gap-4 items-center">
                        <p class="text-indigo mr-6">3.793 USDT</p>
                        <router-link :to="{ name: 'claim' }">
                            <button class="btn-primary text-sm">Claim</button>
                        </router-link>
                        <button class="btn-outline text-sm">Add</button>
                    </div>
                </section>
            </template>
        </Card>
    </div>
</template>

<script setup>
import Card from 'primevue/card'
</script>

<style scoped></style>