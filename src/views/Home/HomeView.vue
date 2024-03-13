<template>
    <div class="text-sm md:text-base">
        <Card class="bg-secondary">
            <template #content>
                <section>
                    <div class="md:flex justify-between md:justify-center md:gap-60 text-white">
                        <div class="md:leading-10 mb-3">
                            <h5>Total Participants</h5>
                            <span v-if="assets.total_users" class="text-purple text-xl font-bold">{{ assets.total_users
                                }}</span>
                            <span v-else>---</span>
                        </div>

                        <div class="md:leading-10 mb-3">
                            <h5>Total Revenue</h5>
                            <span v-if="assets.total_revenues" class="text-purple text-xl font-bold">{{ assets.total_revenues }}</span>
                            <span v-else>---</span>
                        </div>
                    </div>
                </section>
            </template>
        </Card>

        <Card class="bg-grey rounded-lg">
            <template #content>
                <section class="mb-8">
                    <header class="flex justify-center text-xl font-bold mb-5">
                        <span class="text-white">ETH / USDT</span>
                    </header>

                    <main class="flex justify-between md:justify-center md:gap-60 text-gray">
                        <div class="leading-10">
                            <h5 class="text-xs">Nodes</h5>
                            <span v-if="assets.total_nodes" class="text-indigo text-xl font-bold">{{ assets.total_nodes
                                }}</span>
                            <span v-else>---</span>
                        </div>

                        <div class="leading-10">
                            <h5 class="text-xs">Staked</h5>
                            <span v-if="assets.total_stakes" class="text-indigo text-xl font-bold">{{
                                assets.total_stakes }}</span>
                            <span v-else>---</span>
                        </div>
                    </main>
                </section>

                <!-- <section>
                    <header class="flex justify-center text-xl font-bold mb-5">
                        <span class="text-white">TRX / USDT</span>
                    </header>

                    <main class="flex justify-between md:justify-center md:gap-60 text-gray">
                        <div class="leading-10">
                            <h5 class="text-xs">Nodes</h5>
                            <span class="text-indigo text-xl font-bold">2,6834</span>
                        </div>

                        <div class="leading-10">
                            <h5 class="text-xs">Staked</h5>
                            <span class="text-indigo text-xl font-bold">301,185</span>
                        </div>
                    </main>
                </section> -->
            </template>
        </Card>

        <Card class="bg-secondary">
            <template #content>
                <div class="flex justify-between mx-3 md:mx-6 mb-3">
                    <span class="text-xs text-gray">Current Mining</span>
                    <span class="text-xs text-gray">Based on 7days</span>
                </div>

                <div
                    class="bg-primary rounded-3xl text-center p-3 md:px-6 md:py-4 mb-6 flex justify-between text-sm md:text-base">
                    <span class="text-white font-medium">Block Address</span>
                    <span class="text-white font-medium">Quantity</span>
                </div>

                <!-- <template v-if="blocks">
                    <div class="flex justify-between mx-3 md:mx-6 mb-6 text-sm md:text-base">
                        <div class="text-gray">
                            <p v-for="block in blocks">{{ block.wallet.slice(0, 7) }}*******{{ block.wallet.slice(-4) }}
                            </p>
                        </div>
                        <div >
                            <p v-for="block in blocks">{{ block.amount.toUpperCase() }}</p>
                        </div>
                    </div>
                </template> -->

                <marquee direction="up" height="25px" scrollamount="2">
                    <ul v-for="address in randomAddress">
                        <li class="flex justify-between mx-3 md:mx-6 text-sm md:text-base">
                            <span>{{ address[0].slice(0, 8) }}*******{{ address[0].slice(-4) }}</span>
                            <span class="text-indigo">{{ address[1] }}</span>
                        </li>
                    </ul>
                </marquee>

                <h1 class="text-white font-medium mb-5">Regulatory Authority</h1>
                <div class="md:flex justify-between">
                    <div class="bg-grey flex justify-between items-center gap-6 px-8 py-2 rounded-md mb-3">
                        <span class="text-gray">Fairyproof</span>
                        <img class="w-[40px]" src="/fairyproof.svg" alt="fairyproof">
                    </div>

                    <div class="bg-grey flex justify-between items-center gap-6 px-8 py-2 rounded-md mb-3">
                        <span class="text-gray">Slowmist</span>
                        <img class="w-[40px]" src="/slowmist.svg" alt="slowmist">
                    </div>

                    <div class="bg-grey flex justify-between items-center gap-6 px-8 py-2 rounded-md">
                        <span class="text-gray">Certik</span>
                        <img class="w-[40px]" src="/certik.svg" alt="certik">
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import axiosClient from '@/services/axiosClient'
import { randomAddress } from '@/store/randomAddress'

const assets = ref([])
const blocks = ref([])

onMounted(() => {
    getAssets()
    getBlocks()
})

const getAssets = async () => {
    const response = await axiosClient.get('home-assets')
    assets.value = response.data.setting
}

const getBlocks = async () => {
    const response = await axiosClient.get('get-blocks')
    blocks.value = response.data.blocks
}
</script>

<style scoped></style>