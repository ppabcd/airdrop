<script setup>
const nuxtApp = useNuxtApp()
const walletModal = useWalletModal()
const networkData = useNetworkData()
const dataModalWallet = useDataModalWallet()
const walletData = useWalletData()


const name = ref('')
const shortName = ref('')
const address = ref('')
const network = ref('')
const networkName = ref('')
const networkShortName = ref('')
const explorerUrl = ref('')
const id = ref('')

const isHide = ref(true)

function hideModalWallet(){    
    walletModal.value = 0
    id.value = ''
    name.value = ''
    shortName.value = ''
    address.value = ''
    network.value = ''
    networkName.value = ''
    networkShortName.value = ''
    explorerUrl.value = ''
}
function networkChanged(){
    isHide.value = (network.value != '-')
}
async function generateAddress(){
    const {data} = await useFetch('/api/address/generate')
    if(data.value){
        if(data.value.message == "ok"){
            address.value = data.value.address
            prompt('Copy your mnemonic', data.value.mnemonic)
            prompt('Copy your private key', data.value.privateKey)
        }
    }
}

async function checkWallet(){
    const {data} = await useFetch('/api/wallet', {
        method: 'POST'
    })
    if(data.value){
        if(data.value.message == "ok"){
            walletData.value = data.value.data
        }
    }
}
async function checkNetwork(){
    const {data} = await useFetch('/api/network', {
        method: 'POST'
    })
    if(data.value){
        if(data.value.message == "ok"){
            networkData.value = data.value.data
        }
    }
}
async function addWallet(){
    let uniqueTime = nuxtApp.$randomNumber(0,59);
    let time = new Date().getTime()/1000

    if(name.value == '', shortName.value == '', address.value == ''){
        alert('Please fill all field')
        return
    }
    if(network.value == '-'){
        if(networkName.value == '', networkShortName.value == '', explorerUrl.value == ''){
            alert('Please fill all field')
            return
        }
    }
    
    const {data} = await useFetch('/api/wallet/store', {
        method: 'POST',
        body: {
            id: id.value == '' || id.value == undefined ? parseInt(time) + uniqueTime : id.value,
            networkId: parseInt(new Date().getTime()/1000)+uniqueTime,
            name: name.value,
            shortName: shortName.value,
            address: address.value,
            network: network.value,
            networkName: networkName.value,
            networkShortName: networkShortName.value,
            explorerUrl: explorerUrl.value
        }
    })
    if(data.value){
        if(data.value.message == "ok"){
            hideModalWallet()
            checkWallet()
            checkNetwork()
            alert('Successfully added wallet')
        }
    }
}
let inv = null
let prevData = null
if(inv != null){
    clearInterval(inv)
    prevData = null
}
inv = setInterval(() => {
    if(prevData != dataModalWallet.value){
        prevData = dataModalWallet.value
        id.value = dataModalWallet.value.id
        name.value = dataModalWallet.value.name
        shortName.value = dataModalWallet.value.shortName
        address.value = dataModalWallet.value.address
        network.value = dataModalWallet.value.network
    }
}, 1000)

</script>
<template>
    <div id="modalWallet" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!--
                Background overlay, show/hide based on modal state.
                
                Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
                Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
                -->
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <!--
                Modal panel, show/hide based on modal state.
                
                Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                -->
            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                    <div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-5 text-center" id="modal-title-wallet">
                            Add Wallet
                        </h3>
                        <div class="mt-2">
                            <div class="space-y-6 sm:space-y-5">
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-wallet-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Name
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <input v-model="name" type="text" id="form-wallet-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="Metamask 1">
                                    </div>
                                </div>
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-wallet-short-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Short Name
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <input v-model="shortName" type="text" id="form-wallet-short-name" autocomplete="given-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="Meta-1">
                                    </div>
                                </div>
                                <div class="sm:grid sm:grid-cols-6 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-wallet-address" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:col-span-2">
                                    Address
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-3">
                                        <input v-model="address" type="text" id="form-wallet-address" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="0x00000000000000000000">
                                    </div>
                                    <button @click="generateAddress" class="block text-center w-full text-xs align-middle h-full bg-indigo-400 rounded-md justify-center">
                                    Generate
                                    </button>
                                </div>
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-wallet-network" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Network
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <!-- Network selection -->
                                        <select v-model="network" @change="networkChanged" id="form-wallet-network" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                            <option value="">Select network</option>
                                            <option :value="n.shortName" v-for="n in networkData" :key="n">{{n.name}}</option>
                                            <option value="-">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div v-if="!isHide" id="network-name" class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-wallet-network-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Network Name
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <input v-model="networkName" type="text" id="form-wallet-network-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="Binance Smart Chain">
                                    </div>
                                </div>
                                <div v-if="!isHide" id="network-short-name" class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-wallet-network-short-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Network Short Name
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <input v-model="networkShortName" type="text" id="form-wallet-network-short-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="BSC">
                                    </div>
                                </div>
                                <div v-if="!isHide" id="explorer-url" class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-wallet-explorer-url" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Explorer URL
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <input v-model="explorerUrl" type="text" id="form-wallet-explorer-url" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="https://bscscan.com">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button @click="addWallet" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                    Submit
                    </button>
                    <button @click="hideModalWallet" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                    Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>