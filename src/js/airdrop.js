function resetAirdropModal(){
    let name = qs('#form-airdrop-name')
    let description = qs('#form-airdrop-description')
    let type = qs('#form-airdrop-type')
    let wallet = qs('#form-airdrop-wallet')
    let post = qs('#form-airdrop-post')

    name.value = ''
    description.value = ''
    type.value = ''
    wallet.value = ''
    post.value = ''
}
function clearAirdropModal(){
    resetAirdropModal()
    toggleModal('modalAirdrop', 'close')
}
function addAirdrop(){
    let name = qs('#form-airdrop-name')
    let description = qs('#form-airdrop-description')
    let type = qs('#form-airdrop-type')
    let wallet = qs('#form-airdrop-wallet')
    let post = qs('#form-airdrop-post')
    let uniqueTime = randomNumber(0,59);
    let time = new Date().getTime()/1000
    let walletData = wallet.value.split('|')

    console.log(name.value, description.value, type.value, wallet.value, post.value)
    if(name.value == ''|| description.value == '' || type.value == '' || wallet.value == '' || post.value == ''){
        alert('Please fill all the fields')
        return
    }
    let data = {
        id: parseInt(time) + uniqueTime,
        name: name.value,
        description: description.value,
        type: type.value,
        walletName: walletData[0],
        network: walletData[1],
        address: walletData[2],
        walletPlain: wallet.value,
        post: post.value
    }
    axios.put(url+'airdrop/' + type.value +'/'+ parseInt(time) + uniqueTime+'.json', data)
    .then(function(response){
        alert('Airdrop added')
        clearAirdropModal()
        getAirdrop()
    })
    .catch((err) => {
        console.log(err)
    })
}
function getAirdrop(){
    axios.get(url+'airdrop.json')
    .then(function(response){
        let data = response.data
        if(!data){
            setAirdrop()
            return
        }
        airdrop = response.data
        setAirdrop()
    }).catch((err) =>{
        console.error(err)
    })
}
function getType(type){
    let allowedType = ['doing', 'ongoing', 'completed']
    console.log(airdrop[type])
    if(!inArray(type, allowedType)){
        return []
    }
    return airdrop[type] || []
}
function airdropTag(){
    return `
<div class="border-gray-100 border px-5 py-3 rounded-md cursor-pointer mb-5 shadow-sm" onclick="{{JS_ACTION}}">
    <div id="info" class="flex space-x-2 flex-row mb-3">
        <div id="network" class="text-xs bg-yellow-100 font-bold text-yellow-500 px-3 py-1 rounded-full">
            {{NETWORK_SHORT}}
        </div>
        <div id="wallet" class="text-xs bg-gray-800 font-bold text-white px-3 py-1 rounded-full">
            {{WALLET_SHORT}}
        </div>
    </div>
    <h1 class="font-semibold mb-1">
        {{NAME}}
    </h1>
    <p class="text-sm">
        {{DESCRIPTION}}
    </p>
    <div class="flex flex-row items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div class="flex items-center">
            <svg class="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
            </svg>
            <span class="ml-1 leading-none">Dec 12</span>
        </div>
        <div class="relative flex items-center ml-4">
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
        </div>
    </div>
</div>   
`
}
function emptyStateAirdrop(){
    return `
<button type="button" onclick="toggleModal('modalAirdrop', 'open')" class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="mt-2 block text-sm font-medium text-gray-900">
      Add a new Airdrop
    </span>
</button>
`
}
function setAirdrop(){
    let doing = getType('doing')
    let ongoing = getType('ongoing')
    let completed = getType('completed')

    let doingContent = qs('#doing-content')
    let ongoingContent = qs('#ongoing-content')
    let completedContent = qs('#completed-content')

    doingContent.innerHTML = ''
    ongoingContent.innerHTML = ''
    completedContent.innerHTML = ''

    console.log(doing.length !== 0, ongoing.length !== 0, completed.length !== 0)
    if(doing.length !== 0){        
        for(let i in doing){
            let data = doing[i]
            let tag = airdropTag()
            tag = tag.replace('{{NAME}}', data.name)
            tag = tag.replace('{{DESCRIPTION}}', data.description)
            tag = tag.replace('{{NETWORK_SHORT}}', data.network)
            tag = tag.replace('{{WALLET_SHORT}}', data.walletName)
            tag = tag.replace('{{JS_ACTION}}', `showAirdrop('${data.id}', '${data.type}')`)
            doingContent.innerHTML += tag
        }
    } else {
        doingContent.innerHTML = emptyStateAirdrop()
    }

    if(ongoing.length  !== 0){        
        for(let i in ongoing){
            let data = ongoing[i]
            let tag = airdropTag()
            tag = tag.replace('{{NAME}}', data.name)
            tag = tag.replace('{{DESCRIPTION}}', data.description)
            tag = tag.replace('{{NETWORK_SHORT}}', data.network)
            tag = tag.replace('{{WALLET_SHORT}}', data.walletName)
            tag = tag.replace('{{JS_ACTION}}', `showAirdrop('${data.id}', '${data.type}')`)
            ongoingContent.innerHTML += tag
        }
    } else {
        ongoingContent.innerHTML = emptyStateAirdrop()
    }
    if(completed.length !== 0){        
        for(let i in completed){
            let data = completed[i]
            let tag = airdropTag()
            tag = tag.replace('{{NAME}}', data.name)
            tag = tag.replace('{{DESCRIPTION}}', data.description)
            tag = tag.replace('{{NETWORK_SHORT}}', data.network)
            tag = tag.replace('{{WALLET_SHORT}}', data.walletName)
            tag = tag.replace('{{JS_ACTION}}', `showAirdrop('${data.id}', '${data.type}')`)
            completedContent.innerHTML += tag
        }
    } else {
        completedContent.innerHTML = emptyStateAirdrop()
    }
}

function showAirdrop(id, type){
    console.log(id, type)
}