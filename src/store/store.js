import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: 'useWalletStore',
    state: () => ({
        walletAddress: null,
        walletBalance: null,
        walletConnectedToastShown: false
    }),

    getters: {
        getWalletAddress(state) {
            return state.walletAddress
        },

        getWalletBalance(state) {
            return state.walletBalance
        }
    },

    actions: {
        setWalletAddress(walletAddress) {
            this.walletAddress = walletAddress
            this.walletConnectedToastShown = false
        },

        setWalletConnectedToastShown() {
            this.walletConnectedToastShown = true
        },

        setWalletBalance(walletBalance) {
            this.walletBalance = walletBalance
        }
    }
})
