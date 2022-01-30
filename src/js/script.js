function changeMenu(type){
    switch(type){
        case 'wallet':
            qs('#wallet-menu').classList.add('active')
            qs('#wallet-section').classList.remove('hidden-important')
            qs('#airdrop-menu').classList.remove('active')
            qs('#airdrop-section').classList.add('hidden-important')
            break;
        case 'airdrop':
            qs('#wallet-menu').classList.remove('active')
            qs('#wallet-section').classList.add('hidden-important')
            qs('#airdrop-menu').classList.add('active')
            qs('#airdrop-section').classList.remove('hidden-important')
            break;
    }
}

qs(".add-airdrop").addEventListener('click', function(){
    toggleModal('modalAirdrop', 'open')
})
