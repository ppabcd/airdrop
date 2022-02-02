<template>
    <div class="max-w-3xl mx-auto lg:max-w-7xl px-4 lg:px-8 flex space-x-2 flex-row mb-5">
        <NuxtLink  to="/" :class="'menu '+checkMenu($route.params.menu, 'airdrop')">Airdrop</NuxtLink>
        <NuxtLink  to="/wallet" :class="'menu '+checkMenu($route.params.menu, 'wallet')">Wallet</NuxtLink>
        <NuxtLink  to="/sosmed"  :class="'menu '+checkMenu($route.params.menu, 'sosmed')">Social Media</NuxtLink>
        <NuxtLink  to="/channel" :class="'menu '+checkMenu($route.params.menu, 'channel')">Channel Subscribe</NuxtLink>
    </div>
</template>
<script>
export default{
    methods: {
        checkMenu(param, target){
            let allowed = [
                'wallet',
                'sosmed',
                'channel'
            ]
            if(!this.$inArray(param, allowed)){
                if(target == 'airdrop'){
                    return 'active'
                }
                return ''
            }
            if(param == target){
                return 'active'
            }
            return ''
        }
    }
}
</script>
