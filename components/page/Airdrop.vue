<template>
    <div id="airdrop-section" class="max-w-3xl mx-auto grid lg:grid-cols-3 grid-cols-1 lg:max-w-7xl px-4 lg:px-8 md:justify-between md:space-x-5 md:flex">
        <div class="w-full">
            <div>
                <h1 class="text-lg font-bold mb-4">
                    Doing
                </h1>
                <div id="doing-content">
                    <button v-if="!('doing' in airdropData)" @click="showAirdropModal" type="button" class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="mt-2 block text-sm font-medium text-gray-900">
                        Add a new Airdrop
                        </span>
                    </button>
                    <template v-else>
                        <div @click="showAirdrop(a.id, 'doing')" class="border-gray-100 border px-5 py-3 rounded-md cursor-pointer mb-5 shadow-sm" v-for="a in airdropData['doing']" :key="a">
                            <div id="info" class="flex space-x-2 flex-row mb-3">
                                <div id="network" class="text-xs bg-yellow-100 font-bold text-yellow-500 px-3 py-1 rounded-full">
                                    {{a.network}}
                                </div>
                                <div id="wallet" class="text-xs bg-gray-800 font-bold text-white px-3 py-1 rounded-full">
                                    {{a.walletName}}
                                </div>
                            </div>
                            <h1 class="font-semibold mb-1">
                                {{a.name}}
                            </h1>
                            <p class="text-sm">
                                {{a.description}}
                            </p>
                            <div class="flex flex-row items-center w-full mt-3 text-xs font-medium text-gray-400">
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="ml-1 leading-none">{{getFormatedDate(new Date(a.id*1000))}}</span>
                                </div>
                                <!-- <div class="relative flex items-center ml-4">
                                    <svg class="relative w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="ml-1 leading-none">4</span>
                                    </div>
                                    <div class="flex items-center ml-4">
                                    <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="ml-1 leading-none">1</span>
                                    </div> -->
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="w-full">
            <div>
                <h1 class="text-lg font-bold mb-4">
                    On Going
                </h1>
                <div id="ongoing-content">
                    <button v-if="!('ongoing' in airdropData)" @click="showAirdropModal" type="button" class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="mt-2 block text-sm font-medium text-gray-900">
                        Add a new Airdrop
                        </span>
                    </button>
                    <template v-else>
                        <div @click="showAirdrop(a.id, 'ongoing')" class="border-gray-100 border px-5 py-3 rounded-md cursor-pointer mb-5 shadow-sm" v-for="a in airdropData['ongoing']" :key="a">
                            <div id="info" class="flex space-x-2 flex-row mb-3">
                                <div id="network" class="text-xs bg-yellow-100 font-bold text-yellow-500 px-3 py-1 rounded-full">
                                    {{a.network}}
                                </div>
                                <div id="wallet" class="text-xs bg-gray-800 font-bold text-white px-3 py-1 rounded-full">
                                    {{a.walletName}}
                                </div>
                            </div>
                            <h1 class="font-semibold mb-1">
                                {{a.name}}
                            </h1>
                            <p class="text-sm">
                                {{a.description}}
                            </p>
                            <div class="flex flex-row items-center w-full mt-3 text-xs font-medium text-gray-400">
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="ml-1 leading-none">{{getFormatedDate(new Date(a.id*1000))}}</span>
                                </div>
                                <!-- <div class="relative flex items-center ml-4">
                                    <svg class="relative w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="ml-1 leading-none">4</span>
                                    </div>
                                    <div class="flex items-center ml-4">
                                    <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="ml-1 leading-none">1</span>
                                    </div> -->
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="w-full">
            <h1 class="text-lg font-bold mb-4">
                Completed
            </h1>
            <div id="completed-content">
                <button v-if="!('completed' in airdropData)" @click="showAirdropModal" type="button" class="add-airdrop relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="mt-2 block text-sm font-medium text-gray-900">
                    Add a new Airdrop
                    </span>
                </button>
                <template v-else>
                    <div @click="showAirdrop(a.id, 'completed')" class="border-gray-100 border px-5 py-3 rounded-md cursor-pointer mb-5 shadow-sm" v-for="a in airdropData['completed']" :key="a">
                        <div id="info" class="flex space-x-2 flex-row mb-3">
                            <div id="network" class="text-xs bg-yellow-100 font-bold text-yellow-500 px-3 py-1 rounded-full">
                                {{a.network}}
                            </div>
                            <div id="wallet" class="text-xs bg-gray-800 font-bold text-white px-3 py-1 rounded-full">
                                {{a.walletName}}
                            </div>
                        </div>
                        <h1 class="font-semibold mb-1">
                            {{a.name}}
                        </h1>
                        <p class="text-sm">
                            {{a.description}}
                        </p>
                        <div class="flex flex-row items-center w-full mt-3 text-xs font-medium text-gray-400">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                </svg>
                                <span class="ml-1 leading-none">{{getFormatedDate(new Date(a.id*1000))}}</span>
                            </div>
                            <!-- <div class="relative flex items-center ml-4">
                                <svg class="relative w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                                </svg>
                                <span class="ml-1 leading-none">4</span>
                                </div>
                                <div class="flex items-center ml-4">
                                <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path>
                                </svg>
                                <span class="ml-1 leading-none">1</span>
                                </div> -->
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
const airdropData = useAirdropData()
const airdropModal = useAirdropModal()
const dataModalAirdrop = useDataModalAirdrop()

async function showAirdropModal(){
    airdropModal.value = 1
}
async function checkAirdrop(){
    const {data} = await useFetch('/api/getAirdrop', {
        method: 'POST'
    })
    if(data.value){
        if(data.value.message == "ok"){
            airdropData.value = data.value.data
        }
    }
}
function getFormatedDate(date){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
}
async function showAirdrop(id, type){
    const {data} = await useFetch('/api/showAirdrop', {
        method: 'POST',
        body: {
            id: id,
            type: type
        }
    })
    if(data.value){
        if(data.value.message == "ok"){
            dataModalAirdrop.value = JSON.stringify(data.value.data)
            airdropModal.value = 1
        }
    }
}
checkAirdrop()
</script>