<template>
    <section class="flex justify-end items-center gap-2 mb-6 mt-6">
        <w3m-button size="sm" label="Wallet" balance="show" />

        <template v-if="walletAddress">
            <router-link :to="{ name: 'asset', params: { address: walletAddress } }">
                <Button class="btn-primary px-2 py-1 text-white" icon="pi pi-wallet" />
            </router-link>
        </template>
    </section>

    <div class="px-5 md:px-10 lg:px-20 mt-5 md:mt-10">
        <h1 class="font-semibold mb-3">All Pools</h1>
        <div class="card md:flex items-center gap-10 mb-14">
            <img class="w-[240px] mb-7 rounded-xl" src="/usdt.png" alt="USDT">
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

                <template v-if="walletAddress">
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
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useStakeView } from './useStakeView'

const { walletAddress, approveUSDT, isUsdtApproveBtnClicked } = useStakeView()
</script>

<style scoped></style>