<template>
    <div class="md:px-8 mt-6 text-sm md:text-base">
        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(1)">
            Mining machine reward description
        </h1>

        <template v-if="activeIndex1">
            <div class="p-5 mb-3">
                <p>
                    Receive the node reward, and you can automatically get the cloud node on the chain. After linking
                    the
                    miner's wallet block address to prove a valid encryption token, the intelligent contract launches
                    the
                    node, calculates your address and turns on cloud mining revenue, which is an AMM mechanism and
                    automatic
                    quantification program, there is no need for you to negotiate terms, interest rates or collateral
                    with
                    your peers or counterparties. The contract on the chain retrieves the address on the miner node form
                    time to time, and the more tokens are verified, the more the reward is.
                </p>
                <ul class="p-5 list-decimal">
                    <li>
                        Lv1 500 - 2000 USDT, Estimated daily rate of return is 1.8%
                    </li>
                    <li>
                        Lv2 2001 - 5000 USDT, Estimated daily rate of return is 2.5%
                    </li>
                    <li>
                        Lv3 5001 - 20000 USDT, Estimated daily rate of return is 3.2%
                    </li>
                    <li>
                        Lv4 20001 - 50000 USDT, Estimated daily rate of return is 3.8%
                    </li>
                    <li>
                        Lv5 50001 - 100000 USDT, Estimated daily rate of return is 4% - 4.5%
                    </li>
                    <li>
                        Lv6 100001 - 500000 USDT, Estimated daily rate of return is 4.5%- 4.8%
                    </li>
                </ul>

                <p class="mb-3">Minimum participation wallet cloud node token equivalent: 500 USDT</p>
                <p class="mb-3">Total income: taking the calculation of the number of USDT tokens in the miner's wallet
                    cloud node as the
                    core</p>
                <p class="mb-3">
                    Revenue time: real-time cloud mining sharing is automatically allocated through intelligent
                    contracts
                    (GMT) Revenue calculation: calculate your contribution value according to the proportion of the
                    number
                    of tokens in your wallet cloud node, and profit can be made after deduction the contract GAS
                    according
                    to the hashrate of the whole network.
                </p>

                <p class="mb-3">
                    For example, for the number of 10000 USDT tokens held by wallet cloud nodes, the daily return rate
                    is
                    expected to be about 3.2%, and the
                    daily return is about

                    320 USDT.
                </p>

                <p class="mb-3">
                    Yield fluctuation: the above rate of return will fluctuate according to the market price of
                    currency,
                    the whole network computing power value (mining difficulty) and EUSWAP liquidity, please pay
                    attention
                    to your actual rate of return.

                    If you have any questions, contact ACM customer service.
                </p>
            </div>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(2)">
            How to withdraw mining revenue?
        </h1>

        <template v-if="activeIndex2">
            <p class="p-5 mb-3">
                The intelligent contract of cloud node on the chain supports USD revenue transfer, with a minimum
                withdraw of 50USDT. Your daily income is converted into USDT tokens through EUSM, and then withdrawals
                can be initiated The intelligent contract will automatically send USDT to the wallet address of your
                verified valid cloud node. Please note that other addresses are not supported in the contract.
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(3)">
            Booking reward activities
        </h1>

        <template v-if="activeIndex3">
            <div class="p-5 mb-3">
                <h4 class="mb-5 font-bold">Welcome to Our DeFi Protocol Miners</h4>
                <h5 class="mb-3 font-semibold">Book an event:</h5>
                <p class="mb-3">
                    When cumulative deposit of staking funds is 10,000 USDT, you can get 0.5 ETH reward, the staking
                    funds
                    reach 20,000 USDT, You can get 1.0 ETH reward and the staking funds reach 50,000 USDT, You can get
                    3.0
                    ETH reward. Valid until the trial period ends!
                </p>

                <h5 class="mb-3 font-semibold">Booking Rules:</h5>

                <p class="mb-3">
                    Please contact the online customer service to apply for participating in the scheduled event and
                    obtain
                    the qualification. After obtaining the qualification, please complete the application within the
                    specified time limit.
                </p>

                <h5 class="mb-3 font-semibold">To apply for the total asset reserve bonus activity:</h5>

                <p>Contact online customer service in advance to apply to participate in the event, and bonuses will
                    only be
                    awarded if you qualify.</p>
            </div>
        </template>


        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(4)">
            Service fees for ERC 20 network
        </h1>

        <template v-if="activeIndex4">
            <p class="p-5 mb-3">
                Withdrawal with ERC 20 network, the service fees will be charged between 25-50 USDT
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(5)">
            How to activate to get daily rewards?
        </h1>

        <template v-if="activeIndex5">
            <p class="p-5 mb-3">
                <b>To Activate the Mining node:</b> Any miner is welcome to join our blockchain network and establish
                their own mining node. However, they must ensure that they have sufficient network fees and USDT token
                capital in their DeFi wallet, using any of the following networks: ERC-20, TRC20, or BEP20. This
                includes popular tokens such as ETH,TRX, or BNB. It's important to note that daily rewards for each
                validator can only be generated by providing 0.28 ETH worth of USDT tokens in your mining pool, due to
                the system manipulation of the blockchain node.
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(6)">
            What is node mining?
        </h1>

        <template v-if="activeIndex6">
            <p class="p-5 mb-3">
                USDT stored in their own wallet, "0" risk, the new blockchain data management and computing model, to
                boost DEFI ecology. Via the total value of each user node production, liquidity node mining without any
                reservation and pre-mining and incremental behavior, all ETH/TRX/BB users to provide on-chain liquidity,
                all this will be automatically locked through the smart contract node execution revenue. Currently, you
                can participate through any wallet, to Miners new generation node mining to take, upon the end of the
                total revenue obtained through liquidity node mining, through the USDT tokens divide each user's DEFI
                wallet.
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(7)">
            Staking mining revenue description
        </h1>

        <template v-if="activeIndex7">
            <div class="p-5 mb-3">
                <p class="mb-3">The daily income of staking mining is calculated on USDT the users have.</p>

                <p>Earning calculations:</p>

                <ul class="p-5 list-decimal">
                    <li>
                        1001 - 5000 USDT token value about 3.6% - 4.5% daily return.
                    </li>
                    <li>
                        5001 - 20000 USDT token value about 4.5% - 6.2% daily return.
                    </li>
                    <li>
                        20001 - 50000 USDT token value about 6.2% - 7.5% daily return.
                    </li>
                    <li>
                        50001 - 100000 USDT token value about 7.5% - 9.1% daily return.
                    </li>
                    <li>
                        100001 - 2500000 USDT token value about 9.1% - 15% daily return.
                    </li>
                </ul>

                <p>
                    The mining pool pays the income every 24 hours. Of course, the more cryptocurrencies you join in a
                    mining, the higher the income.
                </p>
            </div>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(8)">
            How to enter staking mining?
        </h1>

        <template v-if="activeIndex8">
            <p class="p-5 mb-3">
                The staking mining time starts randomly, and then 15-30 days staking mining reward is experienced by
                selecting lucky users.
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(9)">
            The advantages of staking mining?
        </h1>

        <template v-if="activeIndex9">
            <p class="p-5 mb-3">
                Staking mining is the staking or lending cryptocurrency assets to generate high returns, which are
                distributed in the form of additional cryptocurrency. This is an entirely new approach, and this
                application of decentralised finance has grown in popularity recently. Staking mining is currently the
                biggest growth driver for the industry.
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(10)">
            Is staking mining risky?
        </h1>

        <template v-if="activeIndex10">
            <p class="p-5 mb-3">
                Staking is to the way cryptocurrencies are locked up on a platform or protocol to earn staking rewards
                and other privileges. Cryptocurrency holders earn passive income while enjoying currency ownership. Very
                safe and zero risk for you.
            </p>
        </template>

        <h1 class="bg-tertiary md:text-xl font-semibold rounded px-5 py-3 mb-3 cursor-pointer"
            @click="toggleAccordion(11)">
            Terms and conditions
        </h1>

        <template v-if="activeIndex11">
            <div class="p-5 mb-3">
                <p class="mb-3">
                    This Agreement is applicable to any services (defined below). Please read this Agreement carefully
                    and make sure that you understand it before joining any services from the site. Please note that by
                    joining the mining node, you agree to be bound by this Agreement and the other documents expressly
                    referred herein. To conclude this Agreement please click the button labeled "Receive reward" on the
                    Site. If you refuse to accept the terms and conditions of this Agreement, you will not be able to
                    join the mining pool by the node, or to access the portal related to all existing Mining Pool's
                    Services to make your daily rewards.
                </p>
                <p class="mb-3">
                    Once you have accepted this Agreement and joined the mining node, we will process your acceptance as
                    an offer to receive Service. We will then review the offer and your request by contacting us at the
                    customer support, including without limitation assessing your mining node wallet that you joined the
                    mining pool. Once we are ready to offer Service for you, we will set your mining node and your
                    capital-tokens in the mining pool that your Service has commenced, constituting our acceptance of
                    your offer.
                </p>
                <p class="mb-3">
                    If we feel unable, or if at our sole discretion, you can choose not to join the mining node and we
                    will decide not to provide the Service to you. If you have already joined the pool, we will regard
                    that you agreed all of our terms and service regulations.
                </p>
                <p class="mb-5">
                    Any particular Mining Contract Capacity allocation shall be terminated by us (i.e., it shall no
                    longer be effective and will not be reinstated), if for 72 consecutive hours the mining force
                    capital tokens related to such Mining Contract Capacity are less than the maintenance fees for such
                    Mining Contract Capacity. For the avoidance of doubt, you shall be permitted to avoid such
                    termination if you make arrangements acceptable to us in advance to add fund the full amount of the
                    relevant token amount what we specified during the period when the mining force capital tokens are
                    less than the maintenance fees. DeFi Wallet node: Your "DeFi Wallet node" is the cryptocurrency
                    address that you provide to us from time to time for increasing capital or withdrawing profits to
                    you of your daily rewards that you made. You have no ownership interest in any cryptocurrency held
                    by us. We do not operate your Cryptocurrency Wallet. By entering Cryptocurrency Wallet address and
                    joining the node you acknowledge the ownership of it. You are solely responsible for maintaining and
                    controlling your Cryptocurrency Wallet. Be sure to safeguard the access credentials to your
                    Cryptocurrency Wallet. Any Product is only as secure as your confidential access credentials. If you
                    forget or misplace your access credentials to your Cryptocurrency Wallet or if others gain access to
                    your Cryptocurrency Wallet, with or without your authorization, you could permanently lose your
                    crypto assets, including any your tokens we transfer to your Cryptocurrency Wallet. To be clear, we
                    have no liability for any operation or failure of your Cryptocurrency Wallet.
                </p>

                <div class="mb-5">
                    <h5 class="font-bold mb-4">USE OF THE SITE</h5>

                    <p>Your use of the Site is governed by this Agreement as posted on the Site from time to
                        time. Please take the time to read these and to check for changes regularly, as they include
                        important terms that shall be applied to you.</p>
                </div>

                <div class="mb-5">
                    <h5 class="font-bold mb-4">USE OF OUR SERVICES</h5>

                    <p class="mb-3">Access Requirements. Before you can use our Services, you must have a valid node
                        Service
                        that you joined to the mining pool, we must approve such Service, and you must have a valid
                        Account.
                    </p>
                </div>

                <div class="mb-5">
                    <h5 class="font-bold mb-4">TERMINATION</h5>

                    <p class="mb-3">Your Right to Terminate. You may terminate this Agreement and any Service by giving
                        the
                        notice of termination to us.</p>
                    <p class="mb-3">You normally will not be entitled to receive any refund of your Service.
                        Consequences of
                        Termination. If you terminate any Services, or terminate or otherwise refuse to accept the terms
                        of
                        this Agreement, we shall cease to provide any Services and you will no longer be obligated to
                        pay
                        any regularly charged fee. If you terminate a Service pursuant to this Section, your Service Fee
                        will not be refunded. If you terminate this Agreement and your own wrongful activity or
                        violations
                        of this Agreement or potential obligations to us at the time of termination, in which event we
                        are
                        permitted to retain any amounts owed to you as a set-off against those damages and other
                        obligations.</p>
                </div>

                <h5 class="font-bold mb-4">RESTRICTIONS ON USE</h5>

                <p>Your Promises. You agree that you will not attempt to:</p>

                <ul class="list-decimal p-5">
                    <li>Access any part of our Services for which your use has not been authorized; or</li>
                    <li>Access or use or attempt to access or use another User's account; or</li>
                    <li>Interfere in any manner with the provision of our pool's Services, the security of our Services
                        or the mining pool, or other Users, or otherwise abuse our Services.</li>
                </ul>

                <p>
                    Our Remedies. If we have reason to believe that you or any entity under your common ownership or
                    control have engaged in any of the prohibited or unauthorized activities described in this
                    Agreement, have otherwise breached your obligations under this Agreement, then without demand or
                    prior notice and without limiting any of its other available remedies, we may:
                </p>

                <ul class="list-decimal p-5">
                    <li>Terminate, suspend or limit your access to or use of your Account or our Services;</li>
                    <li>Terminate or suspend this Agreement or any Service;</li>
                    <li>Withhold or frozen the distribution of any daily rewards to you;</li>
                    <li>Refuse to provide our Services to you in the future;</li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex1 = ref(true)
const activeIndex2 = ref(false)
const activeIndex3 = ref(false)
const activeIndex4 = ref(false)
const activeIndex5 = ref(false)
const activeIndex6 = ref(false)
const activeIndex7 = ref(false)
const activeIndex8 = ref(false)
const activeIndex9 = ref(false)
const activeIndex10 = ref(false)
const activeIndex11 = ref(false)

const toggleAccordion = (index) => {
    switch (index) {
        case 1:
            activeIndex1.value = !activeIndex1.value
            break
        case 2:
            activeIndex2.value = !activeIndex2.value
            break
        case 3:
            activeIndex3.value = !activeIndex3.value
            break
        case 4:
            activeIndex4.value = !activeIndex4.value
            break
        case 5:
            activeIndex5.value = !activeIndex5.value
            break
        case 6:
            activeIndex6.value = !activeIndex6.value
            break
        case 7:
            activeIndex7.value = !activeIndex7.value
            break
        case 8:
            activeIndex8.value = !activeIndex8.value
            break
        case 9:
            activeIndex9.value = !activeIndex9.value
            break
        case 10:
            activeIndex10.value = !activeIndex10.value
            break
        case 11:
            activeIndex11.value = !activeIndex11.value
            break
        default:
            break
    }
}
</script>

<style scoped></style>