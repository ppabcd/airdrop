<script setup>
    let airdropModal = useAirdropModal()
    let walletModal = useWalletModal()
    function showAirdropModal(){
        airdropModal.value = 1
    }
    function showWalletModal(){
        walletModal.value = 1
    }
</script>
<template>
    <div>
        <div class="min-h-full">
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex px-2 lg:px-0">
                            <div class="flex-shrink-0 flex items-center">
                                <a href="https://rezajuliandri.my.id">
                                    <svg class="h-10 w-auto fill-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="160px" height="160px" viewBox="0 0 160 160" version="1.1">
                                        <g>
                                            <path style="stroke:none;" d="M 23.136719 6.734375 C 21.199219 7.214844 19.519531 8.128906 17.199219 9.96875 C 14.191406 12.351562 12.894531 14.175781 11.886719 17.390625 L 11.441406 18.800781 L 11.441406 88.078125 L 11.792969 89.40625 C 12.800781 93.167969 15.265625 96.207031 18.640625 97.839844 C 20.785156 98.878906 21.792969 99.105469 24.238281 99.121094 C 25.9375 99.121094 26.558594 99.039062 27.585938 98.753906 C 32.015625 97.472656 35.40625 94.03125 36.671875 89.519531 L 37.039062 88.238281 L 37.121094 70.558594 L 37.199219 52.878906 L 44.320312 59.839844 C 48.832031 64.257812 51.824219 67.054688 52.480469 67.488281 C 56.144531 69.871094 60.894531 70.222656 64.894531 68.398438 C 67.585938 67.167969 69.839844 65.039062 71.105469 62.527344 C 72.207031 60.320312 72.542969 58.800781 72.433594 56.398438 C 72.320312 53.664062 71.585938 51.535156 70.03125 49.441406 C 69.679688 48.960938 66.71875 45.921875 63.457031 42.703125 C 60.191406 39.472656 57.550781 36.800781 57.601562 36.769531 C 57.648438 36.71875 64.878906 37.824219 73.679688 39.230469 C 91.726562 42.097656 91.9375 42.113281 94.449219 41.375 C 96.976562 40.625 98.671875 39.585938 100.496094 37.632812 C 102.671875 35.328125 103.839844 32.367188 103.839844 29.199219 C 103.839844 24.558594 101.183594 20.207031 97.089844 18.160156 C 94.71875 16.976562 99.96875 17.886719 52.929688 10.480469 C 33.550781 7.425781 26.71875 6.398438 25.726562 6.414062 C 24.992188 6.414062 23.839844 6.558594 23.136719 6.734375 Z M 23.136719 6.734375 "/>
                                            <path style="stroke:none;" d="M 102.480469 69.136719 C 94.511719 69.839844 86.894531 72.910156 80.558594 78 C 78.640625 79.550781 75.40625 82.894531 73.902344 84.878906 C 63.777344 98.367188 63.28125 116.335938 72.6875 130.273438 C 73.679688 131.742188 74.574219 132.785156 76.929688 135.152344 C 78.609375 136.847656 80.640625 138.71875 81.535156 139.40625 C 83.105469 140.574219 85.855469 142.398438 86.097656 142.398438 C 86.160156 142.398438 85.550781 141.40625 84.753906 140.191406 C 81.152344 134.800781 79.070312 129.34375 77.96875 122.398438 C 77.601562 120.046875 77.550781 112.273438 77.902344 110 C 78.671875 104.878906 79.808594 100.976562 81.726562 96.910156 C 87.136719 85.472656 96.992188 77.886719 108.320312 76.480469 C 110.304688 76.238281 114.175781 76.289062 116.144531 76.574219 C 122.769531 77.535156 128.929688 80.59375 133.984375 85.425781 C 137.585938 88.863281 141.105469 94.175781 143.121094 99.199219 C 144.382812 102.335938 145.519531 106.671875 145.855469 109.566406 C 145.902344 110.113281 146.03125 110.558594 146.128906 110.558594 C 146.351562 110.558594 146.160156 105.136719 145.839844 103.039062 C 144.960938 97.007812 142.542969 90.976562 139.121094 86.160156 C 136.832031 82.960938 134.480469 80.480469 130.816406 77.441406 C 126.222656 73.617188 119.632812 70.671875 113.28125 69.617188 C 109.488281 68.976562 106.0625 68.832031 102.480469 69.136719 Z M 102.480469 69.136719 "/>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                            <nav aria-label="Global" class="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4">
                                <a href="https://airdrop.rezajuliandri.my.id" class="px-3 py-2 text-red-500 text-sm font-medium hover:text-red-400">
                                    Airdrop
                                </a>
                            </nav>
                        </div>
                        <div class="flex items-center lg:hidden">
                            <!-- Mobile menu button -->
                            <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <!-- Heroicon name: outline/menu -->
                                <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                        <!-- Mobile menu, show/hide based on mobile menu state. -->
                        
                        <div class="hidden lg:ml-4 lg:flex lg:items-center space-x-2">
                            <button type="button" @click="showAirdropModal" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-0">
                                Add Airdrop
                            </button>
                            <button type="button" @click="showWalletModal" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-yellow-600 bg-yellow-200 hover:bg-yellow-300 focus:outline-none focus:ring-0">
                                Add Wallet
                            </button>
                            
                            <!-- Profile dropdown -->
                            <div class="ml-4 relative flex-shrink-0">
                                <div>
                                    <button type="button" class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span class="sr-only">Open user menu</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main class="py-10">
                <slot />
            </main>
        </div>
    </div>
</template>