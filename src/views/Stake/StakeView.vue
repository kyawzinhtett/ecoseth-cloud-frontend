<template>
    <template class="flex justify-center">
        <div class="mt-10">
            <h1 class="font-semibold mb-3">All Pools</h1>
            <div class="card flex items-center gap-10 mb-14">
                <img class="w-[240px]" src="/image-1.png" alt="Ethereum Eth">
                <div>
                    <h1 class="font-bold text-2xl mb-7">ETH/USDT</h1>
                    <div class="flex justify-between mb-3">
                        <div>
                            <p class="text-xs text-gray mb-3">Total Liquidity</p>
                            <p class="font-bold text-2xl"> 1,329,732.61 USD</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray mb-3">APY</p>
                            <p class="font-bold text-2xl text-indigo">4.5% - 4.8%</p>
                        </div>
                    </div>
                    <div class="bg-[#141414] rounded-3xl text-center px-28 py-3 mb-6">
                        <span>Up to 4.8% of return by $5,000 invested</span>
                    </div>
                    <router-link :to="{ name: 'pool' }">
                        <button class="btn-primary">Stake</button>
                    </router-link>
                </div>
            </div>
            <div class="card flex items-center gap-10">
                <img class="w-[240px]" src="/image-2.png" alt="Tron Trx">
                <div>
                    <h1 class="font-bold text-2xl mb-7">TRX/USDT</h1>
                    <div class="flex justify-between mb-3">
                        <div>
                            <p class="text-xs text-gray mb-3">Total Liquidity</p>
                            <p class="font-bold text-2xl"> 1,001,761.32 USD</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray mb-3">APY</p>
                            <p class="font-bold text-2xl text-indigo">3.5% - 4.0%</p>
                        </div>
                    </div>
                    <div class="bg-[#141414] rounded-3xl text-center px-28 py-3 mb-6">
                        <span>Up to 4.0% of return by $4,000 invested</span>
                    </div>
                    <router-link :to="{ name: 'pool' }">
                        <button class="btn-primary">Stake</button>
                    </router-link>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup>

</script>

<style scoped></style>