<script setup>
const nuxtApp = useNuxtApp()
const walletData = useWalletData()
const dataModalAirdrop = useDataModalAirdrop()
const airdropModal = useAirdropModal()
function hideModalAirdrop(){    
    airdropModal.value = 0
    dataModalAirdrop.value = null
    keyAddOn.value = []
    valueAddOn.value = []
    totalAddOn.value = 0
}
const id = ref('')
const tempType = ref('')
const name = ref('')
const description = ref('')
const type = ref('')
const wallet = ref('')
const walletPlain = ref('')
const post = ref('')
const keyAddOn = ref([])
const valueAddOn = ref([])
const totalAddOn = ref(0)
const isHideType = ref(true)

const networkData = useNetworkData()
const airdropData = useAirdropData()
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
async function checkAirdrop(){
    const {data} = await useFetch('/api/airdrop', {
        method: 'POST'
    })
    if(data.value){
        if(data.value.message == "ok"){
            airdropData.value = data.value.data
        }
    }
}

async function addAirdrop(){
    let uniqueTime = nuxtApp.$randomNumber(0,59);
    let time = new Date().getTime()/1000

    let dataAddOn = {}
    for(let i = 0; i < totalAddOn.value; i++){
        if(keyAddOn.value[i] != '' && valueAddOn.value[i] != ''){
            dataAddOn[keyAddOn.value[i]] = valueAddOn.value[i]
        }
    }

    if(name.value == '' || description.value == '' || type.value == '' || wallet.value == ''){
        nuxtApp.$toast.error('Please fill all field')
    }

    let airdropData = {
        id: id.value == '' ? parseInt(time) + uniqueTime : id.value,
        name: name.value,
        description: description.value,
        type: type.value,
        wallet: wallet.value,
        post: post.value,
        addOn: dataAddOn
    }
    if(!nuxtApp.$isValidHttpUrl(post.value)){
        alert('Invalid URL in post field')
        return
    }
    if(id.value !== '' && tempType.value !== ''){
        await useFetch('/api/airdrop/destroy', {
            method: 'POST',
            body: {
                id: id.value,
                type: type.value
            }
        })
        id.value = ''
        tempType.value = ''
    }
    const {data} = await useFetch('/api/airdrop/store', {
       method: 'POST',
       body: airdropData
    })
    if(data.value){
        if(data.value.message == "ok"){
            hideModalAirdrop()
            checkAirdrop()
            alert('Successfully added airdrop')
            isHideType.value = true
        }
    }
}
async function deleteAirdrop(){
    const {data} = await useFetch('/api/airdrop/destroy', {
        method: 'POST',
        body: {
            id: id.value,
            type: type.value
        }
    })
    if(data.value){
        if(data.value.message == "ok"){
            hideModalAirdrop()
            checkAirdrop()
            alert('Successfully deleted airdrop')
        }
    }
}
function getSimpleWallet(walletPlain){
    let wallet = walletPlain.split('|')
    wallet = wallet[1] + ' - ' + nuxtApp.$getWalletAddress(wallet[2]) + '('+wallet[0]+')'
    return wallet
}

function addMoreInformation(){
    totalAddOn.value++
}
</script>
<script>
    export default{
        mounted(){
            if(this.dataModalAirdrop){
                let modalData = JSON.parse(this.dataModalAirdrop)
                this.id = modalData.id
                this.name = modalData.name
                this.description = modalData.description
                this.type = modalData.type
                this.wallet = modalData.walletPlain
                this.walletPlain = modalData.walletPlain
                this.post = modalData.post
                this.tempType = modalData.type
                this.isHideType = false
                if(modalData.addOn){
                    let a = 0
                    let listKey = []
                    let listValue = []
                    for(let i in modalData.addOn){
                        listKey[a] = i
                        listValue[a] = modalData.addOn[i]
                        a++
                    }
                    this.keyAddOn = listKey
                    this.valueAddOn = listValue
                    this.totalAddOn = a
                }
            }
        }
    }
</script>
<template>
    <div id="modalAirdrop" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                    <div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-5 text-center" id="modal-title-wallet">
                            Add Airdrop
                        </h3>
                        <div class="mt-2">
                            <div class="space-y-6 sm:space-y-5" id="form-airdrop-field">
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-airdrop-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Name
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <input v-if="isHideType" v-model="name" type="text" id="form-airdrop-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="Airdrop Name">
                                        <span v-else>{{name}}</span>
                                    </div>
                                </div>
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-airdrop-description" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Description
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <textarea v-if="isHideType" v-model="description" placeholder="Airdrop Description" rows="4" name="comment" id="form-airdrop-description" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                                        <span v-else>{{description}}</span>
                                    </div>
                                </div>
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-airdrop-type" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Type
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <!-- Wallet selection -->
                                        <select v-if="isHideType" v-model="type" id="form-airdrop-type" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                            <option value="doing">Doing</option>
                                            <option value="ongoing">On Going</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        <span v-else>{{type}}</span>
                                    </div>
                                </div>
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-airdrop-wallet" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Wallet
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <!-- Wallet selection -->
                                        <select v-if="isHideType" v-model="wallet" id="form-airdrop-wallet" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">                                            
                                            <option :value="w.shortName+'|'+w.network+'|'+w.address" v-for="w in walletData" :key="w">{{w.shortName+' '+$getWalletAddress(w.address)}}</option>
                                        </select>
                                        <span v-else>{{getSimpleWallet(walletPlain)}}</span>
                                    </div>
                                </div>
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="form-airdrop-post" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    URL Airdrop Post
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <input v-if="isHideType" v-model="post" type="text" id="form-airdrop-post" autocomplete="given-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="https://t.me/111111/11111">
                                        <a :href="post" target="_blank" v-else class="text-indigo-500 font-bold">{{post}}</a>
                                    </div>
                                </div>
                                <div v-if="isHideType">
                                    <div v-for="index in totalAddOn" :key="index">
                                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 addOnSection">
                                            <input type="text" autocomplete="given-name" class="addOnInformation max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="Key" v-model="keyAddOn[index-1]">
                                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                                <!-- Wallet selection -->
                                                <input type="text" autocomplete="given-name" class="valueAddOnInformation max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" placeholder="Value" v-model="valueAddOn[index-1]">
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-for="index in totalAddOn" :key="index" class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                                        <label for="form-airdrop-post" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        {{keyAddOn[index-1]}}
                                        </label>
                                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                                            <span>{{valueAddOn[index-1]}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <div id="addMoreInformationButton">
                        <button v-if="isHideType" @click="addMoreInformation" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">Add More Information</button>
                    </div>
                    <div class="mt-2" v-if="!isHideType" id="deleteAirdropButton">
                        <button @click="deleteAirdrop" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm">Delete Airdrop</button>
                    </div>
                    <div class="mt-2 sm:mt-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button v-if="!isHideType" @click="isHideType = !isHideType" id="edit-airdrop-button" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                        Edit
                        </button>
                        <button v-if="isHideType" id="submit-airdrop-button" @click="addAirdrop" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                        Submit
                        </button>
                        <button @click="hideModalAirdrop" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>