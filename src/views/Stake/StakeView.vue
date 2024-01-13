<template>
    <div class="px-5 md:px-10 lg:px-20 mt-5 md:mt-10">
        <h1 class="font-semibold mb-3">All Pools</h1>
        <div class="card md:flex items-center gap-10 mb-14">
            <img class="w-[240px] mb-7" src="/image-1.png" alt="Ethereum Eth">
            <div class="w-full">
                <h1 class="font-bold md:text-xl mb-6">ETH/USDT</h1>
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
                    <button class="btn-primary text-sm md:text-base">Stake</button>
                </router-link>
            </div>
        </div>

        <div class="card md:flex items-center gap-10 mb-14">
            <img class="w-[240px] mb-7" src="/image-2.png" alt="Tron Trx">
            <div class="w-full">
                <h1 class="font-bold md:text-xl mb-6">TRX/USDT</h1>
                <div class="flex justify-between mb-3">
                    <div>
                        <p class="text-xs text-gray mb-3">Total Liquidity</p>
                        <p class="md:text-lg"> 1,001,761.32 USD</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray mb-3">APY</p>
                        <p class="md:text-lg text-indigo">3.5% - 4.0%</p>
                    </div>
                </div>
                <div class="bg-[#141414] rounded-3xl text-center px-2 xl:px-28 py-3 mb-6">
                    <span class="text-xs md:text-sm">Up to 4.0% of return by $4,000 invested</span>
                </div>
                <router-link :to="{ name: 'pool' }">
                    <button class="btn-primary text-sm md:text-base">Stake</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>