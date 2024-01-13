<template>
    <div class="h-screen mt-10">
        <div class="bg-primary rounded-3xl flex justify-evenly py-3 w-full md:w-1/2 mb-8">
            <p @click="toggleCurrency('BSC')" :class="{ 'font-bold': isBSC }" class="cursor-pointer hover:opacity-80">
                BSC
            </p>
            <p @click="toggleCurrency('ERC')" :class="{ 'font-bold': isERC }" class="cursor-pointer hover:opacity-80">
                ERC
            </p>
            <p @click="toggleCurrency('AVAX')" :class="{ 'font-bold': isAVAX }" class="cursor-pointer hover:opacity-80">
                AVAX
            </p>
        </div>

        <section>
            <div class="mb-8">
                <div class="mb-2">
                    <label class="text-sm text-gray" for="address">Withdraw Address</label>
                </div>
                <InputText id="address"
                    class="bg-secondary border border-gray-700 w-full md:w-1/2 p-3 rounded-md" />
            </div>

            <div class="mb-10">
                <div class="mb-2">
                    <label class="text-sm text-gray" for="amount">Amount</label>
                </div>
                <InputText id="amount" type="number" min="0"
                    class="bg-secondary border border-gray-700 w-full md:w-1/2 p-3 rounded-md" />
                <p class="text-gray text-xs mt-1">Available transfer: <span class="text-white font-bold">23 USDT</span>
                </p>
            </div>

            <Button label="Confirm" class="btn-primary text-xs md:text-base md:px-24" />
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const isBSC = ref(true)
const isERC = ref(false)
const isAVAX = ref(false)

const toggleCurrency = (currency) => {
    if (currency === 'BSC') {
        isBSC.value = true
        isERC.value = false
        isAVAX.value = false
    } else if (currency === 'ERC') {
        isBSC.value = false
        isERC.value = true
        isAVAX.value = false
    } else if (currency === 'AVAX') {
        isBSC.value = false
        isERC.value = false
        isAVAX.value = true
    }
}
</script>

<style scoped></style>