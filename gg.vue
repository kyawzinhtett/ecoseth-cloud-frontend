
// Withdraw USDT
const withdrawUSDT = async (user, amount) => {
    // Ensure the user has connected their wallet
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const connectedUserAddress = accounts[0]

    if (wallet !== connectedUserAddress) {
        console.log('Please connect to your wallet!')
    } else {
        try {
            const transaction = await contract.methods.withdrawUSDT(user, amount).send({
                from: wallet,
            })

            console.log('USDT Withdrawal successful:', transaction)
        } catch (error) {
            console.error('Error during USDT withdrawal:', error)
        }
    }
}


// Withdraw Eth
const withdrawETH = async (user, amount) => {
    // Ensure the user has connected their wallet
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const connectedUserAddress = accounts[0]

    if (wallet !== connectedUserAddress) {
        console.log('Please connect to your wallet!')
    } else {
        try {
            // Convert amount to Wei
            const amountInEth = web3.utils.toWei(amount.toString(), 'ether')

            // Call the withdraw method on the contract
            const transaction = await contract.methods.withdrawETH(user, amountInEth).send({
                from: wallet,
            })

            console.log('Withdrawal successful:', transaction)
        } catch (error) {
            console.error('Error withdrawing from contract:', error)
        }
    }
}