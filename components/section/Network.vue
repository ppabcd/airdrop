<template>
    <div class="w-full">
            <h1 class="text-lg font-bold mb-4">
                Networks
            </h1>
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
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Short Name
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Explorer
                                                            </th>
                                                            <th scope="col" class="relative px-6 py-3">
                                                                <span class="sr-only">Delete</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="network-data">
                                                        <tr v-if="networkData.length == 0">
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-center" colspan="6">Network not available</td>
                                                        </tr>
                                                        <tr v-for="network in networkData" :key="network" v-else>
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">{{network.name}}</td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">{{network.shortName}}</td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium"><a :href='network.url' class="text-indigo-400" target="_blank">{{network.url}}</a></td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                                <a href="javascript:void(0)" @click="deleteNetwork(network.id)" class="text-red-600 hover:text-indigo-900">Delete</a>
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
</template>
<script setup>
const networkData = useNetworkData()
async function checkNetwork(){
    const {data} = await useFetch('/api/getNetwork', {
        method: 'POST'
    })
    if(data.value){
        if(data.value.message == "ok"){
            networkData.value = data.value.data
        }
    }
}
async function deleteNetwork(id){
    const {data} = await useFetch('/api/deleteNetwork', {
        method: 'POST',
        body: {
            id: id
        }
    })
    if(data.value){
        if(data.value.message == "ok"){
            checkNetwork()
            alert('Successfully deleted wallet')
        }
    }
}
checkNetwork()
</script>