<script setup>

const nuxtApp = useNuxtApp()

let accountId = ref('')
let accountName = ref('')
let apiKey = ref('')
let apiSecret = ref('')
let accessToken = ref('')
let accessTokenSecret = ref('')

async function addAccount(){
    let uniqueTime = nuxtApp.$randomNumber(0,59);
    let time = new Date().getTime()/1000

    let apiData = {
        id: accountId.value == '' ? parseInt(time) + uniqueTime : accountId.value,
        accountName: accountName.value,
        apiKey: apiKey.value,
        apiSecret: apiSecret.value,
        accessToken: accessToken.value,
        accessTokenSecret: accessTokenSecret.value
    }
    const {data} = await useFetch('/api/addTwitterAccount', {
        method: 'POST',
        body: apiData
    })
    if(data.value){
        if(data.value.message == "ok"){
            accountName.value = ''
            accountData.value = data.value.account
            accessToken.value = ''
            accessTokenSecret.value = ''
            alert("Successfully added your twitter account")
        } else if(data.value.message == "error"){
            alert(data.value.error)
        }
    }
}

// Tweet data
let selectedAccount = ref('')
let tweetText = ref('')
let isRetweet = ref(false)
let retweetTarget = ref('')
let isLike = ref(false)
let likeTarget = ref('')
let accountData = ref([])
async function tweetReset(){
    selectedAccount.value = ''
    tweetText.value = ''
    isRetweet.value = false
    retweetTarget.value = ''
    isLike.value = false
    likeTarget.value = ''
}
async function tweetAction(){
    let twitterRestData = {
        like: null,
        retweet: null,
    }
    if(selectedAccount.value == ''){
        alert('Please select account')
        return
    }
    twitterRestData.apiData = selectedAccount.value
    if(isLike.value){
        if(likeTarget.value == ''){
            alert('Please write the tweet') 
            return
        }
        twitterRestData.like = likeTarget.value
    }
    if(isRetweet.value){
        if(retweetTarget.value == ''){
            alert('Please select a tweet to retweet')
            return
        }
        if(!nuxtApp.$isValidHttpUrl(retweetTarget.value)){
            alert('Retweet target is not a valid url')
            return
        }
        twitterRestData.retweet = retweetTarget.value
    }
    if(tweetText.value == ''){
        alert('Please input tweet text')
        return
    }
    if(tweetText.value.length > 280){
        alert('Tweet text is too long')
        return
    }
    twitterRestData.tweet = tweetText.value
    const {data} = await useFetch('/api/tweet', {
        method: 'POST',
        body: twitterRestData
    })
    if(data.value){
        if(data.value.message == "ok"){
            alert('Successfully Tweeted')
        } else if(data.value.message == "error"){
            alert(data.value.error)
        }
    }
}

async function getAccount(){
    const {data} = await useFetch('/api/getTwitterAccount', {
        method: 'GET'
    })
    if(data.value){
        if(data.value.message == "ok"){
            accountData.value = data.value.account
        } else if(data.value.message == "error"){
            alert(data.value.error)
        }
    }
}
async function deleteAccount(id){
    const {data} = await useFetch('/api/deleteTwitterAccount', {
        method: 'POST',
        body: {
            id: id
        }
    })
    if(data.value){
        if(data.value.message == "ok"){
            getAccount()
        } else if(data.value.message == "error"){
            alert(data.value.error)
        }
    }
}

const templateInput = ref('')
const templateList = ref([])
const usernameList = ref('')
function addTag(){
    if(usernameList.value == ''){
        return
    }
    const {data} = useFetch('/api/addTwitterTag', {
        method: 'POST',
        body:{
            tag: usernameList.value
        }
    })
    if(data.value){
        if(data.value.message == "error"){
            alert(data.value.error)
        }
    }
}
async function getTag(){
    const {data} = await useFetch('/api/getTwitterTag', {
        method: 'GET'
    })
    if(data.value){
        if(data.value.message == "ok"){
            usernameList.value = data.value.tag
        } else if(data.value.message == "error"){
            alert(data.value.error)
        }
    }
}
function getUserameTag(){
    if(usernameList.value == ''){
        return ''
    }
    let usernameTag = usernameList.value.split(',')
    let usernameTagList = []
    for(let i = 0; i < usernameTag.length; i++){
        usernameTagList.push('@' + usernameTag[i].trim())
    }
    return usernameTagList.join(' ')
}
async function generateTweet(){
    let randData = nuxtApp.$randomNumber(0, templateList.value.length-1)
    tweetText.value = templateList.value[randData].template.replace('{USERNAME}', getUserameTag())
}
async function useTemplate(text){
    tweetText.value = text.replace('{USERNAME}', getUserameTag())
}
async function addTweetTemplate(){
    if(templateInput.value == ''){
        alert('Please input template')
        return
    }

    let uniqueTime = nuxtApp.$randomNumber(0,59);
    let time = new Date().getTime()/1000

    const {data} = await useFetch('/api/postTemplate', {
        method: 'POST',
        body: {
            id: parseInt(time) + uniqueTime,
            template: templateInput.value
        }
    })
    if(data.value){
        if(data.value.message == "ok"){
            alert('Successfully added template')
            getAllTweetTemplate()
            templateInput.value = ''
        } else if(data.value.message == "error"){
            alert(data.value.error)
        }
    }
}
async function deleteTemplate(id){
    if(id == ''){
        alert('Please select template')
        return
    }
    const {data} = await useFetch('/api/deleteTemplate', {
        method: 'POST',
        body: {
            id: id
        }
    })
    if(data.value){
        if(data.value.message == "ok"){
            alert('Successfully deleted template')
            getAllTweetTemplate()
        } else if(data.value.message == "error"){
            alert(data.value.error)
        }
    }
}
async function getAllTweetTemplate(){
    const {data} = await useFetch('/api/getTemplate', {
        method: 'GET'
    })
    if(data.value){
        if(data.value.message == "ok"){
            templateList.value = data.value.data
        } else if(data.value.message == "error"){
            alert(data.value.error)
        }
    }
}
getAccount()
getAllTweetTemplate()
getTag()
</script>
<script>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
export default {
    components: {
        Switch,
        SwitchGroup,
        SwitchLabel,
    },
    watch: {
        isLike(val){
            if(this.isRetweet){
                if(this.$isValidHttpUrl(this.retweetTarget)){
                    let splitUrl = this.retweetTarget.split('/')
                    let idLike = splitUrl[splitUrl.length - 1]
                    if(!isNaN(idLike)){
                        this.likeTarget = idLike
                    }
                }
            }
        }
    }
}
</script>
<template>
    <div>
        <div id="sosmed-section" class="max-w-3xl mx-auto grid lg:grid-cols-2 grid-cols-1 lg:max-w-7xl px-4 lg:px-8 md:justify-between md:space-x-5 md:flex mb-5">
            <div class="w-full">
                <h1 class="font-bold text-lg">Social Media (Twitter)</h1>
                <small class="mb-2 block">Data ini akan disimpan pada browser pengguna</small>
                <div class="block mb-3">
                    <label>Account Name</label>
                    <input v-model="accountName" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="block mb-3">
                    <label>API KEY</label>
                    <input v-model="apiKey" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="block mb-3">
                    <label>API KEY Secret</label>
                    <input v-model="apiSecret" type="password" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="block mb-3">
                    <label>Access Token</label>
                    <input v-model="accessToken" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="block mb-3">
                    <label>Access Token Secret</label>
                    <input v-model="accessTokenSecret" type="password" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="mt-2 sm:mt-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button @click="addAccount" id="submit-airdrop-button"  type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                        Submit
                    </button>
                </div>
            </div>
            <div class="w-full">
                <h1 class="font-bold text-lg mb-2">Tweet</h1>
                <div class="block mb-3">
                    <label>Account</label>
                    <select v-model='selectedAccount' class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option value="">Select Account</option>
                        <option v-for="account in accountData" :value="account.apiData" :key="account.id">{{account.accountName}}</option>
                    </select>
                </div>
                <div class="block mb-3">
                    <label>Tweet</label>
                    <textarea rows="5" v-model="tweetText" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                </div>
                <div class="mt-2 sm:mt-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button @click="generateTweet" id="submit-airdrop-button"  type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                        Generate
                    </button>
                </div>
                <div class="flex items-center mb-3">
                    <SwitchGroup as="div" class="flex items-center">
                        <Switch v-model="isRetweet" :class="[isRetweet ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
                        <span aria-hidden="true" :class="[isRetweet ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                        </Switch>
                        <SwitchLabel as="span" class="ml-3">
                        <span class="text-sm font-medium text-gray-900">Retweet</span>
                        </SwitchLabel>
                    </SwitchGroup>
                </div>
                <div class="block mb-3" v-if="isRetweet">
                    <label>Retweet URL</label>
                    <input v-model="retweetTarget" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                </div>
                <div class="flex items-center mb-3" >
                    <SwitchGroup as="div" class="flex items-center">
                        <Switch v-model="isLike" :class="[isLike ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
                        <span aria-hidden="true" :class="[isLike ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                        </Switch>
                        <SwitchLabel as="span" class="ml-3">
                        <span class="text-sm font-medium text-gray-900">Like Tweet</span>
                        </SwitchLabel>
                    </SwitchGroup>
                </div>
                <div class="block mb-3" v-if="isLike">
                    <label>Target ID</label>
                    <input v-model="likeTarget" type="number" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    <small>Target Id: https://twitter.com/username/status/<b>1488872191856807936</b><br>Required for like a tweet</small>
                </div>
                <div class="mt-2 sm:mt-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button @click="tweetAction" id="submit-airdrop-button"  type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                        Tweet
                    </button>
                    <button @click="tweetReset" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                        Reset
                    </button>
                </div>
            </div>
            <div class="w-full">
                <h1 class="font-bold text-lg mb-2">Template Tweet</h1>
                <div class="block mb-3">
                    <label>Text</label>
                    <textarea v-model="templateInput" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Good project sir {USERNAME}"></textarea>
                    <small>Gunakan {USERNAME} untuk mereplace dengan username twitter yang akan di tag.</small>
                </div>
                <div class="mt-2 sm:mt-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense mb-5">
                    <button @click="addTweetTemplate" id="submit-airdrop-button"  type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                        Submit
                    </button>
                    <a href="#tweet-template" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                        View All Template
                    </a>
                </div>
                <h1 class="font-bold text-lg mb-2">Twitter Tag Username</h1>
                <div class="block mb-3">
                    <label>Username</label>
                    <textarea @change="addTag" v-model="usernameList" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="akun1,akun2,akun3,akun4"></textarea>
                    <small>Tuliskan dengan pemisah tanda koma (,) untuk masing-masing user. <br>Contoh: akun1,akun2</small>
                </div>
                <div class="mt-2 sm:mt-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button @click="usernameList = ''" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                        Reset
                    </button>
                </div>
            </div>
        </div>
        <div id="account-section" class="max-w-3xl mx-auto grid lg:grid-cols-2 grid-cols-1 lg:max-w-7xl px-4 lg:px-8 md:justify-between md:space-x-5 md:flex">
            <div class="w-full">
                <h1 class="font-bold text-lg mb-3">Twitter Account</h1>
                <div class="space-y-6" id="wallet-list">
                <section aria-labelledby="notes-title">
                    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                        <div class="divide-y divide-gray-200">
                            <div>
                                <!-- Transaksi disini -->
                                <div class="flex flex-col">
                                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div class="pt-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table class="min-w-full divide-y divide-gray-200">
                                                    <thead class="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Name
                                                            </th>
                                                            <th scope="col" class="relative px-6 py-3">
                                                                <span class="sr-only">Delete</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="wallets-data">
                                                        <tr v-if="accountData.length == 0">
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-center" colspan="6">Account data not available</td>
                                                        </tr>
                                                        <tr v-else v-for="accData in accountData" :key="accData">
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">{{accData.accountName}}</td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                                <a href="#" @click="deleteAccount(accData.id)" class="text-red-600 hover:text-indigo-900">Delete</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </div>
            <div class="w-full" id="tweet-template">
                <h1 class="font-bold text-lg mb-3">Tweet Template</h1>
                <div class="space-y-6" id="wallet-list">
                <section aria-labelledby="notes-title">
                    <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                        <div class="divide-y divide-gray-200">
                            <div>
                                <!-- Transaksi disini -->
                                <div class="flex flex-col">
                                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div class="pt-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table class="min-w-full divide-y divide-gray-200">
                                                    <thead class="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Text
                                                            </th>
                                                            <th scope="col" class="relative px-6 py-3">
                                                                <span class="sr-only">Use</span>
                                                            </th>
                                                            <th scope="col" class="relative px-6 py-3">
                                                                <span class="sr-only">Delete</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-if="templateList.length == 0">
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-center" colspan="6">Template data not available</td>
                                                        </tr>
                                                       <tr v-else v-for="tl in templateList" :key="tl">
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">{{tl.template.substring(0, 120)+'...'}}</td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                                <a href="#" @click="useTemplate(tl.template)" class="text-indigo-600 hover:text-indigo-900">Use</a>
                                                            </td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                                <a href="#" @click="deleteTemplate(tl.id)" class="text-red-600 hover:text-indigo-900">Delete</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </div>
        </div>
    </div>
</template>