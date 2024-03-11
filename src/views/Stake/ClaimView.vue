<template>
    <div class="h-screen mt-6">
        <div class="bg-primary rounded-3xl flex justify-evenly py-3 w-full md:w-1/2 mb-8">
            <p @click="toggleCurrency('BSC')" :class="{ 'font-bold': isBSC }"
                class="cursor-pointer hover:opacity-80 text-xs md:text-base">
                BSC
            </p>
            <p @click="toggleCurrency('ERC')" :class="{ 'font-bold': isERC }"
                class="cursor-pointer hover:opacity-80 text-xs md:text-base">
                ERC
            </p>
            <p @click="toggleCurrency('AVAX')" :class="{ 'font-bold': isAVAX }"
                class="cursor-pointer hover:opacity-80 text-xs md:text-base">
                AVAX
            </p>
        </div>

        <section>
            <form @submit.prevent="handleSubmit(!v$.$invalid)">
                <div class="mb-8">
                    <div class="mb-2">
                        <label class="text-sm text-gray" for="address">Withdraw Address</label>
                    </div>
                    <InputText v-model="v$.wallet_address.$model" id="address"
                        class="bg-secondary border border-gray-700 w-full md:w-1/2 p-3 rounded-md" />

                    <!-- Validation -->
                    <div>
                        <small v-if="(v$.wallet_address.$invalid && submitted) || v$.wallet_address.$pending.$response"
                            class="text-red-500 text-xs">
                            {{ v$.wallet_address.required.$message.replace('Value', 'Wallet Address') }}
                        </small>
                    </div>
                </div>

                <div class="mb-10">
                    <div class="mb-2">
                        <label class="text-sm text-gray" for="amount">Amount</label>
                    </div>
                    <InputText v-model="v$.amount.$model" id="amount" type="number" min="0"
                        class="bg-secondary border border-gray-700 w-full md:w-1/2 p-3 rounded-md" />
                    <p v-if="availableUsdt" class="text-gray text-xs mt-1">
                        Available transfer: <span class="text-white font-bold">{{ parseFloat(availableUsdt).toFixed(3) }} USDT</span>
                    </p>

                    <!-- Validation -->
                    <div>
                        <small v-if="(v$.amount.$invalid && submitted) || v$.amount.$pending.$response"
                            class="text-red-500 text-xs">
                            {{ v$.amount.required.$message.replace('Value', 'Amount') }}
                        </small>
                    </div>
                </div>

                <Button :disabled="state.amount === '' || state.amount === '0' || state.amount === null || isClicked" type="submit" label="Confirm" class="btn-primary text-xs md:text-base md:px-24" />
            </form>
        </section>
    </div>
    <Toast class="z-10" />
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import axiosClient from '@/services/axiosClient'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useRoute } from 'vue-router'

const route = useRoute()
const toast = useToast()
const isBSC = ref(true)
const isERC = ref(false)
const isAVAX = ref(false)
const user = ref([])
const selectedNetwork = ref('BSC')
const userStats = ref([])
const availableUsdt = ref(null)
const isClicked = ref(false)

const wallet = route.params.address

const state = reactive({
    wallet_address: null,
    amount: null
})

const rules = computed(() => {
    return {
        wallet_address: { required },
        amount: { required }
    }
})

const submitted = ref(false)

const v$ = useVuelidate(rules, state)

const handleSubmit = (isFormValid) => {
    submitted.value = true

    if (!isFormValid) {
        return
    }

    withdraw()
}

onMounted(() => {
    getUser(wallet)
    getUserStats()
})

const getUser = async (walletAddress) => {
    const response = await axiosClient.get(`/user/${walletAddress}`)
    user.value = response.data.data
    state.wallet_address = walletAddress
}

const getUserStats = async () => {
    const response = await axiosClient.get(`/get-wallet-data/${wallet}`)
    userStats.value = response.data.user_stats
    availableUsdt.value = userStats.value.profits.total_profit_usdt
}

const toggleCurrency = (currency) => {
    selectedNetwork.value = currency

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

const withdraw = async () => {
    try {
        isClicked.value = true

        const params = {
            user_id: user.value.user_id,
            withdraw_wallet: state.wallet_address,
            network: selectedNetwork.value,
            amount: state.amount
        }

        const response = await axiosClient.post('/create/withdraw', params)

        if (response && response.data) {
            state.amount = 0
            toast.add({ severity: 'success', detail: 'Withdraw Success!', life: 3000 })
        } else {
            toast.add({ severity: 'error', detail: 'Withdraw Fail!', life: 3000 })
        }

        isClicked.value = false
    } catch (error) {
        isClicked.value = false
        toast.add({ severity: 'error', detail: 'Withdraw Fail!', life: 3000 })
    }
}

watch(
    () => state.wallet_address,
    () => {
        getUser(state.wallet_address)
    }
)

watch(
    () => state.amount,
    () => {
        if (parseFloat(state.amount) <= parseFloat(availableUsdt.value)) {
            isClicked.value = false
        } else {
            isClicked.value = true
        }
    }
)

</script>

<style scoped></style>