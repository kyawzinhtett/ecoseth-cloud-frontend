<template>
    <header class="fixed top-0 w-full bg-gradient px-6 py-2 z-10 flex justify-between">
        <div>
            <h1 class="header-text text-lg md:text-xl lg:text-2xl">
                <router-link :to="{ name: 'home' }">
                    EcosEth Cloud
                </router-link>
            </h1>
            <p class="hidden md:block">
                <router-link :to="{ name: 'home' }">
                    Decentralized Staking Protocol
                </router-link>
            </p>
        </div>

        <!-- Mobile Navigation -->
        <div class="card flex justify-content-center">
            <Sidebar class="bg-black text-white" v-model:visible="visible" position="top" :showCloseIcon="false" style="height: auto">
                <ul>
                    <router-link :to="{ name: 'home' }">
                        <li :class="{ 'bg-primary': activeRoute === 'home' }" class="flex justify-center py-2 rounded-md text-sm"
                            @click="handleVisible">
                            Home
                        </li>
                    </router-link>
                    <router-link :to="{ name: 'stake' }">
                        <li :class="{ 'bg-primary': activeRoute === 'stake' }" class="flex justify-center py-2 rounded-md text-sm"
                            @click="handleVisible">
                            Stake
                        </li>
                    </router-link>
                    <router-link :to="{ name: 'about' }">
                        <li :class="{ 'bg-primary': activeRoute === 'about' }" class="flex justify-center py-2 rounded-md text-sm"
                            @click="handleVisible">
                            About Us
                        </li>
                    </router-link>
                    <router-link :to="{ name: 'support' }">
                        <li :class="{ 'bg-primary': activeRoute === 'support' }" class="flex justify-center py-2 rounded-md text-sm"
                            @click="handleVisible">
                            Support
                        </li>
                    </router-link>
                </ul>
            </Sidebar>
            <Button class="block lg:hidden" icon="pi pi-align-right" @click="visible = true" />
        </div>
    </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'

const path = useRoute()
const activeRoute = ref()

onMounted(() => {
    activeRoute.value = path.name
})

watch(path, () => {
    activeRoute.value = path.name
})

const visible = ref(false)

const handleVisible = () => {
    visible.value = !visible.value
} 
</script>

<style scoped></style>