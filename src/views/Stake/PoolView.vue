<template>
    <router-link :to="{ name: 'wallet' }">
        <section class="flex justify-end items-center gap-2 mb-6">
            <p>Wallet</p>
            <Button class="btn-primary px-2 py-1 text-white" icon="pi pi-wallet" aria-label="Wallet" />
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
import { ref } from 'vue'

const selectedOption = ref()
const options = ref([
    { name: 'ETH/USDT', code: 'ETH' },
    { name: 'TRX/USDT', code: 'TRX' }
])

const items = ref([
    { label: 'Add ETH' },
    { label: 'Add USDT' }
]);
</script>

<style scoped></style>