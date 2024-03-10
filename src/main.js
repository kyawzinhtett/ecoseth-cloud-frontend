import '@/assets/main.css'

import { Chains, createWeb3Auth } from '@kolirt/vue-web3-auth'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import App from '@/App.vue'
import router from '@/router'
import ToastService from 'primevue/toastservice'

const pinia = createPinia()
const app = createApp(App)

app.use(router)

app.use(PrimeVue)

app.use(ToastService)

app.use(pinia)

app.use(
    createWeb3Auth({
        projectId: 'd6eb491145ddbafe8af894199f6ff961',
        chains: [Chains.mainnet, Chains.sepolia, Chains.polygon]
    })
)

app.mount('#app')
