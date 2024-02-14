<template>
    <div class="h-screen md:px-8">
        <Card class="mt-4 bg-secondary rounded-md text-sm md:text-base">
            <template #content>
                <section class="md:mx-12">
                    <section>
                        <div class="mb-8">
                            <div class="mb-2">
                                <label class="text-sm text-gray flex items-center justify-between" for="address">
                                    <p class="text-xl font-bold">From</p>
                                    <div class="flex items-center gap-2">
                                        <img src="/ether.svg" alt="Ether" class="w-[50px] h-[50px]">
                                        <p>ETH</p>
                                    </div>
                                </label>
                            </div>
                            <InputText type="number" min="0"
                                class="bg-secondary border border-gray-700 w-full p-3 rounded-md text-white"
                                placeholder="Please enter amount" />
                        </div>

                        <div class="mb-4 flex justify-center">
                            <button
                                class="flex items-center gap-2 btn-primary px-6 md:px-12 rounded-3xl text-xs md:text-base">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4">
                                    <path
                                        d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z"
                                        fill="#ffffff" />
                                </svg>
                                <p>All</p>
                            </button>
                        </div>

                        <div class="mb-12">
                            <InputText v-model="usdtAmount"
                                class="bg-secondary border border-gray-700 w-full p-3 rounded-md mb-2 text-white"
                                disabled />
                            <div>
                                <label class="text-sm text-gray flex items-center justify-between" for="address">
                                    <p class="text-xl font-bold">To</p>
                                    <div class="flex items-center gap-2">
                                        <img src="/usdt.svg" alt="USDT" class="w-[50px] h-[50px]">
                                        <p>USDT</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="flex justify-center">
                            <Button label="Exchange" class="btn-primary text-xs md:text-base md:px-24" />
                        </div>
                    </section>
                </section>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'

const usdtAmount = ref(0)

</script>

<style scoped></style>