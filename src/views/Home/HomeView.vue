<template>
    <div>
        <Card class="bg-secondary">
            <template #content>
                <section>
                    <div class="flex justify-center gap-60 text-white">
                        <div class="leading-10">
                            <h5>Total Participants</h5>
                            <span class="text-purple text-xl font-bold">27,687,1185</span>
                        </div>

                        <div class="leading-10">
                            <h5>Total Participants</h5>
                            <span class="text-purple text-xl font-bold">27,687,1185</span>
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

                    <main class="flex justify-center gap-60 text-gray">
                        <div class="leading-10">
                            <h5 class="text-xs">Nodes</h5>
                            <span class="text-indigo text-xl font-bold">2,6834</span>
                        </div>

                        <div class="leading-10">
                            <h5 class="text-xs">Staked</h5>
                            <span class="text-indigo text-xl font-bold">301,185</span>
                        </div>
                    </main>
                </section>

                <section>
                    <header class="flex justify-center text-xl font-bold mb-5">
                        <span class="text-white">TRX / USDT</span>
                    </header>

                    <main class="flex justify-center gap-60 text-gray">
                        <div class="leading-10">
                            <h5 class="text-xs">Nodes</h5>
                            <span class="text-indigo text-xl font-bold">2,6834</span>
                        </div>

                        <div class="leading-10">
                            <h5 class="text-xs">Staked</h5>
                            <span class="text-indigo text-xl font-bold">301,185</span>
                        </div>
                    </main>
                </section>
            </template>
        </Card>

        <Card class="bg-secondary">
            <template #content>
                <div class="flex justify-between mx-6 mb-3">
                    <span class="text-xs text-gray">Current Mining</span>
                    <span class="text-xs text-gray">Based on 7days</span>
                </div>

                <div class="bg-primary rounded-3xl text-center px-6 py-4 mb-6 flex justify-between">
                    <span class="text-white font-medium">Block Address</span>
                    <span class="text-white font-medium">Quantity</span>
                </div>

                <div class="flex justify-between mx-6 mb-6">
                    <div class="text-gray">
                        <p>Ox1xLKSUou*******Jtc61</p>
                        <p>Yz3xUXSIou*******jlks21</p>
                        <p>Ox1xLKSUou*******Jtc61</p>
                    </div>
                    <div class="text-indigo">
                        <p>3.862996 ETH</p>
                        <p>3.862996 ETH</p>
                        <p>3.862996 ETH</p>
                    </div>
                </div>

                <h1 class="text-white font-medium mb-5">Regulatory Authority</h1>
                <div class="flex justify-between">
                    <div class="bg-grey flex justify-between items-center gap-6 px-8 py-2 rounded-md">
                        <span class="text-gray">Fairyproof</span>
                        <img class="w-[40px]" src="/fairyproof.svg" alt="fairyproof">
                    </div>

                    <div class="bg-grey flex justify-between items-center gap-6 px-8 py-2 rounded-md">
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
import Card from 'primevue/card'
</script>

<style scoped></style>