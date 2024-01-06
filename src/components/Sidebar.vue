<template>
    <aside class="hidden lg:block col-span-2 pt-7 mt-16 h-screen">
        <ul>
            <router-link :to="{ name: 'home' }">
                <li :class="{ 'bg-primary': activeRoute === 'home' }" class="flex justify-center py-5 rounded-md mb-10">
                    Home
                </li>
            </router-link>
            <router-link :to="{ name: 'stake' }">
                <li :class="{ 'bg-primary': activeRoute === 'stake' }" class="flex justify-center py-5 rounded-md mb-10">
                    Stake
                </li>
            </router-link>
            <router-link :to="{ name: 'about' }">
                <li :class="{ 'bg-primary': activeRoute === 'about' }" class="flex justify-center py-5 rounded-md mb-10">
                    About Us
                </li>
            </router-link>
            <li class="flex justify-center py-5 rounded-md mb-10">Support</li>
        </ul>
    </aside>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const path = useRoute()
const activeRoute = ref()

onMounted(() => {
    activeRoute.value = path.name
})

watch(path, () => {
    activeRoute.value = path.name
})
</script>

<style scoped></style>