import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: 'useWalletStore',
    state: () => ({
        walletAddress: null,
        walletBalance: null
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
        },

        setWalletBalance(walletBalance) {
            this.walletBalance = walletBalance
        }
    }
})