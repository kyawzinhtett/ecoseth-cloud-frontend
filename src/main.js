import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import App from '@/App.vue'
import router from '@/router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)

app.use(PrimeVue)

app.use(pinia)

app.mount('#app')
