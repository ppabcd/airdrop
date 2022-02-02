function changeMenu(type){
    let listMenu = ['wallet', 'airdrop', 'sosmed', 'channel']

    for(let i = 0; i < listMenu.length; i++){
        qs(`#${listMenu[i]}-menu`).classList.remove('active')
        qs(`#${listMenu[i]}-section`).classList.add('hidden-important')        
    }

    if(inArray(type, ['wallet', 'airdrop', 'sosmed', 'channel'])){
        qs(`#${type}-menu`).classList.add('active')
        qs(`#${type}-section`).classList.remove('hidden-important')
    }
}

qs(".add-airdrop").addEventListener('click', function(){
    toggleModal('modalAirdrop', 'open')
})