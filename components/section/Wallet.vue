<template>
    <div class="w-full">
            <h1 class="text-lg font-bold mb-4">
                Wallets
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
                                                                Address
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Name
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Short Name
                                                            </th>
                                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Network
                                                            </th>
                                                            <th scope="col" class="relative px-6 py-3">
                                                                <span class="sr-only">Edit</span>
                                                            </th>
                                                            <th scope="col" class="relative px-6 py-3">
                                                                <span class="sr-only">Delete</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="wallets-data">
                                                        <tr v-if="walletData.length == 0">
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-center" colspan="6">Wallet data not available</td>
                                                        </tr>
                                                        <tr v-for="wallet in walletData" :key="wallet" v-else>
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium" @click="$copyData(wallet.address)">{{$getWalletAddress(wallet.address) }}</td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">{{wallet.name}}</td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">{{wallet.shortName}}</td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">{{wallet.network}}</td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                                <a href="#" @click="editWallet(wallet.id)" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                                            </td>
                                                            <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                                <a href="#" @click="deleteWallet(wallet.id)" class="text-red-600 hover:text-indigo-900">Delete</a>
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
const walletData = useWalletData()
const dataModalWallet = useDataModalWallet()
const walletModal = useWalletModal()

async function checkWallet(){
    const {data} = await useFetch('/api/getWallet', {
        method: 'POST'
    })
    if(data.value){
        if(data.value.message == "ok"){
            walletData.value = data.value.data
        }
    }
}
async function editWallet(id){
    const {data} = await useFetch('/api/showWallet', {
        method: 'POST',
        body: {
            id: id
        }
    })
    if(data.value){
        if(data.value.message == "ok"){
            if(data.value.data != null){
                dataModalWallet.value = data.value.data
                dataModalWallet.value.id = id
                walletModal.value = 1
            }
        }
    }
}
async function deleteWallet(id){
    const {data} = await useFetch('/api/deleteWallet', {
        method: 'POST',
        body: {
            id: id
        }
    })
    if(data.value){
        if(data.value.message == "ok"){
            checkWallet()
            alert('Successfully deleted wallet')
        }
    }
}
checkWallet()
</script>