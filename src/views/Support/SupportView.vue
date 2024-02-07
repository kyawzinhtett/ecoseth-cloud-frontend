<template>
    <div class="md:px-8 mt-6 text-sm md:text-base">
        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer" @click="toggleAccordion(1)">
            Reward Description
        </h1>

        <template v-if="activeIndex1">
            <ul class="p-5 list-decimal mb-3">
                <li class="mb-6">
                    Lv1 500 - 2000 USDT
                    <p>Estimated daily rate of return is <span class="text-indigo">1.8%</span></p>
                </li>
                <li class="mb-6">
                    Lv2 2001 - 5000 USDT
                    <p>Estimated daily rate of return is <span class="text-indigo">2.5%</span></p>
                </li>
                <li class="mb-6">
                    Lv3 5001 - 20000 USDT
                    <p>Estimated daily rate of return is <span class="text-indigo">3.2%</span></p>
                </li>
                <li class="mb-6">
                    Lv4 20001 - 50000 USDT
                    <p>Estimated daily rate of return is <span class="text-indigo">3.8%</span></p>
                </li>
                <li class="mb-6">
                    Lv5 50001 - 100000 USDT
                    <p>Estimated daily rate of return is <span class="text-indigo">4% - 4.5%</span></p>
                </li>
                <li>
                    Lv6 100001 - 500000 USDT
                    <p>Estimated daily rate of return is <span class="text-indigo">4.5% - 4.8%</span></p>
                </li>
            </ul>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer" @click="toggleAccordion(2)">
            Service Fees
        </h1>

        <template v-if="activeIndex2">
            <p class="p-5 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis temporibus numquam quia tenetur autem quas quo magni ipsum ipsa officiis nisi, quisquam totam minus nihil culpa alias mollitia distinctio vel.
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer" @click="toggleAccordion(3)">
            How to withdraw revenue?
        </h1>

        <template v-if="activeIndex3">
            <p class="p-5 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis temporibus numquam quia tenetur autem quas quo magni ipsum ipsa officiis nisi, quisquam totam minus nihil culpa alias mollitia distinctio vel.
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer" @click="toggleAccordion(4)">
            Reward activities
        </h1>

        <template v-if="activeIndex4">
            <p class="p-5 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis temporibus numquam quia tenetur autem quas quo magni ipsum ipsa officiis nisi, quisquam totam minus nihil culpa alias mollitia distinctio vel.
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer" @click="toggleAccordion(5)">
            How to activate to get daily rewards?
        </h1>

        <template v-if="activeIndex5">
            <p class="p-5 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis temporibus numquam quia tenetur autem quas quo magni ipsum ipsa officiis nisi, quisquam totam minus nihil culpa alias mollitia distinctio vel.
            </p>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex1 = ref(true)
const activeIndex2 = ref(false)
const activeIndex3 = ref(false)
const activeIndex4 = ref(false)
const activeIndex5 = ref(false)

const toggleAccordion = (index) => {
    switch (index) {
        case 1:
            activeIndex1.value = !activeIndex1.value
            break
        case 2:
            activeIndex2.value = !activeIndex2.value
            break
        case 3:
            activeIndex3.value = !activeIndex3.value
            break
        case 4:
            activeIndex4.value = !activeIndex4.value
            break
        case 5:
            activeIndex5.value = !activeIndex5.value
            break
        default:
            break
    }
}
</script>

<style scoped></style>