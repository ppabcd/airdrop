<script setup>
import '@/assets/css/tailwind.css'

const airdropModal = useAirdropModal()
const networkModal = useNetworkModal()
const walletModal = useWalletModal()
const authModal = useAuthModal()

const walletData = useWalletData()
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
checkWallet()
</script>
<template>
    <div>
        <NavigationComponents/>
        <PageAirdrop v-if="checkLayout($route.params.menu, 'airdrop')"/>
        <PageWallet v-if="checkLayout($route.params.menu, 'wallet')"/>
        <PageSosmed v-if="checkLayout($route.params.menu, 'sosmed')"/>

        <!-- Modal -->
        <ModalAuth v-if="modalAuth"/>
        <ModalAirdrop v-if="modalAirdrop"/>
        <ModalWallet v-if="modalWallet"/>
        <!-- End Modal -->
    </div>
</template>
<script>

export default{
    data(){
        return{
            modalAuth: true,
            modalAirdrop: false,
            modalWallet: false,
            modalNetwork: false
        }
    },
    methods: {
        checkLayout(param, target){
            let allowed = [
                'airdrop',
                'wallet',
                'sosmed',
                'channel'
            ]
            if(!this.$inArray(param, allowed)){
                if(target == 'airdrop'){
                    return true
                }
                return false
            }
            if(param == target){
                return true
            }
            return false
        }
    },
    watch: {
        airdropModal(val){
            this.modalAirdrop = (val == 1)
        },
        networkModal(val){
            this.modalNetwork = (val == 1)
        },
        walletModal(val){
            this.modalWallet = (val == 1)
        },
        authModal(val){
            this.modalAuth = (val == 1)
        }
    }
}
</script>
