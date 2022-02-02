<script setup>
import { useNuxtApp } from '#app'
const showAuthModal = useAuthModal()
const url = ref('')
const password = ref('')

async function login(){
    if(url.value== '' || password.value == ''){
        alert('Please fill all fields')
        return
    }
    if(!useNuxtApp().$isValidHttpUrl(url.value)){
        alert('Invalid URL')
        url.value = ''
        return
    }
    if(url.value.indexOf('firebase') === -1){
        alert('Please use firebase URL')
        url.value = ''
        return
    }
   const {data} = await useFetch('/api/setUrl', {
       method: 'POST',
       body: {
            url: url.value,
            password: password.value
       }
   })
   if(data.value.message == "ok"){
       showAuthModal.value = 0
   }
}
async function checkCredentials(){
    const {data} = await useFetch('/api/checkUrl')
    if(data.value){
        if(data.value.message == "ok"){
            showAuthModal.value = 0
        }
    }
}
checkCredentials()
</script>
<template>
    <div id="modalLogin" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                    <div class="mt-3 sm:mt-5" id="firebase-form">
                        <div>
                            <div class="space-y-6 sm:space-y-5">
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                    <label for="form-description" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Firebase Realtime URL
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <input 
                                            v-model='url'
                                            type="text" 
                                            id="firebase-url"
                                            class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                            placeholder="https://[PROJECT-id].[REGION].firebasedatabase.app/"
                                            >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 sm:mt-5">
                        <div>
                            <div class="space-y-6 sm:space-y-5">
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                                    <label for="form-description" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Password
                                    </label>
                                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                                        <input v-model='password' type="password" id="password" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-6">
                    <button @click="login" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm">
                    Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>