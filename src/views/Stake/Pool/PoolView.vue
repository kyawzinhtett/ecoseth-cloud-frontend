<template>
    <div class="mt-4 text-sm md:text-base">
        <section class="flex justify-end items-center gap-2 mb-6 mt-6">
            <w3m-button size="sm" label="Wallet" balance="show" />

            <template v-if="walletAddress">
                <router-link :to="{ name: 'asset', params: { address: walletAddress } }">
                    <Button class="btn-primary px-2 py-1 text-white" icon="pi pi-wallet" />
                </router-link>
            </template>
        </section>

        <h1 class="text-lg md:text-xl font-semibold mb-6">Ether Staking Pool</h1>

        <section class="mb-5">
            <div class="flex items-center gap-3 mb-3">
                <img src="/ether.svg" alt="Ether" class="w-[50px] h-[50px]">
                <p>ETH</p>
            </div>

            <div class="md:flex items-center gap-3 mb-2">
                <InputText v-model="ethAmount" type="number" min="0"
                    class="bg-secondary border border-gray-700 w-full md:w-1/2 p-3 mb-3" placeholder="Enter amount" />
            </div>
        </section>

        <section class="mb-6">
            <Card class="bg-secondary shadow-sm shadow-gray-900 text-white md:px-8">

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
        </section>

        <section class="flex justify-center mb-3">
            <Button @click="depositETH(ethAmount)" label="Add Liquidity" class="btn-primary text-xs md:text-base"
                :disabled="ethAmount === 0 || ethAmount === null || isEthBtnClicked" />
        </section>
    </div>

    <Toast class="z-10" />
</template>

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Toast from 'primevue/toast'
import { usePoolView } from './usePoolView'

const { walletAddress, depositETH, isEthBtnClicked, ethAmount, ethApyAmount, ethEstimatedPrincipal, ethEstimatedEarn, setting } = usePoolView()
</script>

<style scoped></style>