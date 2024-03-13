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

window.__lc = window.__lc || {};
window.__lc.license = 17367384;
;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice));

