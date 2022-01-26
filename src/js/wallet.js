function resetWalletModal(){
    let name = qs('#form-wallet-name')
    let shortName = qs('#form-wallet-short-name')
    let address = qs('#form-wallet-address')
    let network = qs('#form-wallet-network')
    let networkName = qs('#form-wallet-network-name')
    let networkShortName = qs('#form-wallet-network-short-name')
    let explorerUrl = qs('#form-wallet-explorer-url')
    name.value = ''
    shortName.value = ''
    address.value = ''
    network.value = ''
    networkName.value = ''
    explorerUrl.value = ''
    networkShortName = ''


    networkName = qs('#network-name')
    explorerUrl = qs('#explorer-url')
    networkShortName = qs('#network-short-name')
    networkName.classList.add('hidden-important')
    networkShortName.classList.add('hidden-important')
    explorerUrl.classList.add('hidden-important')
}
function clearWalletModal(){
    resetWalletModal()
    toggleModal('modalWallet', 'close')
}
function addWallet(){
    let name = qs('#form-wallet-name')
    let shortName = qs('#form-wallet-short-name')
    let address = qs('#form-wallet-address')
    let network = qs('#form-wallet-network')
    let networkName = qs('#form-wallet-network-name')
    let networkShortName = qs('#form-wallet-network-short-name')
    let explorerUrl = qs('#form-wallet-explorer-url')
    let uniqueTime = randomNumber(0,59);
    let time = new Date().getTime()/1000
    let isAddNetwork = false

    if(name.value == '' || shortName.value == '' || address.value == '' || network.value == ''){
        alert('Please fill all the fields')
        return
    }
    if(network.value == '-' && networkName.value != ''){
        if(networkName.value == '' || networkShortName.value == ''){
            alert('Please fill all the fields')
            return
        }
        isAddNetwork = true
    }
    if(isAddNetwork){
        let dataNetwork = {
            name: networkName.value,
            shortName: networkShortName.value,
            url: explorerUrl.value
        }
        axios.put(url+'network/' + parseInt(time) + uniqueTime+'.json', dataNetwork)
    }
    let dataWallet = {
        name: name.value,
        shortName: shortName.value,
        address: address.value,
        network: isAddNetwork ? networkName.value : network.value,
    }
    let urlHttp = url+'wallet/' + parseInt(time) + uniqueTime+'.json'
    if(tempKey != ''){
        urlHttp = url+'wallet/' + tempKey+'.json'
    }
    axios.put(urlHttp, dataWallet)
        .then(function(){
            if(tempKey != ''){
                alert('Wallet updated')
            } else {
                alert('Wallet added')
            }
            tempKey = ''
            clearWalletModal()
            getWallets()
            getNetworks()
        })
        .catch((err) => {
            console.log(err)
        })
}
function editWallet(key){
    axios.get(url+'wallet/' + key+'.json')
        .then(function(response){
            let data = response.data
            if(data == null){
                alert('Wallet not found')
                return
            }
            let name = qs('#form-wallet-name')
            let shortName = qs('#form-wallet-short-name')
            let address = qs('#form-wallet-address')
            let network = qs('#form-wallet-network')
            name.value = data.name
            shortName.value = data.shortName
            address.value = data.address
            network.value = data.network
            tempKey = key
            toggleModal('modalWallet', 'open')
        })
        .catch(function(error){
            console.log(error)
        })
}
function deleteWallet(key){
    axios.delete(url+'wallet/' + key+'.json')
        .then(function(){
            alert('Wallet deleted')
            getWallets()
        })
        .catch(function(error){
            console.log(error)
        })
}
async function getWallets(){
    wallets = []
    await axios.get(url+'wallet.json')
        .then(function(response){
            let data = response.data
            if(data == null){
                setWallets()
                return
            }
            let keys = Object.keys(data)
            for(let i = 0; i < keys.length; i++){
                data[keys[i]].id = keys[i]
                wallets.push(data[keys[i]])
            }
        })
        .catch(function(error){
            console.log(error)
        }).finally(() => {
            setWallets()
        })
}
function setWallets(){
    let selectWallet = qs('#form-airdrop-wallet')    
    removeOption(selectWallet)
    let optionWallet = document.createElement('option')
    optionWallet.value = ''
    optionWallet.text = 'Wallet'
    selectWallet.add(optionWallet)
    for(let i = 0; i < wallets.length; i++){
        let walletAddress = wallets[i].address.substring(0, 7) + '...' + wallets[i].address.slice(wallets[i].address.length - 5)
        let option = document.createElement('option')
        option.value = wallets[i].shortName + '|' + wallets[i].network + '|' + wallets[i].address
        option.innerHTML = wallets[i].name + ' (' + wallets[i].network + ') | ' + walletAddress
        selectWallet.appendChild(option)
    }

    let walletTable = qs('#wallets-data')
    walletTable.innerHTML = ''
    if(wallets.length < 1){
        walletTable.innerHTML = '<tr><td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-center" colspan="6">Wallet data not available</td></tr>'
        return
    }
    for(let i = 0; i < wallets.length; i++){
        let odd = i % 2 == 0? 'bg-gray-50': 'bg-white';
        let wallet = wallets[i]
        let tr = document.createElement('tr')
        tr.classList.add(odd)
        let walletAddress = wallet.address.substring(0, 7) + '...' + wallet.address.slice(wallet.address.length - 5)
        tr.innerHTML = `
                <td class="px-6 py-5 whitespace-nowrap text-sm font-medium" onclick="copyData('`+wallet.address+`')">${walletAddress}</td>
                <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">${wallet.name}</td>
                <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">${wallet.shortName}</td>
                <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">${wallet.network}</td>
                <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <a href="javascript:void(0)" onclick="editWallet('`+ wallet.id +`')" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
                <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <a href="javascript:void(0)" onclick="deleteWallet('`+ wallet.id +`')" class="text-red-600 hover:text-indigo-900">Delete</a>
                </td>
        `
        walletTable.appendChild(tr)
    }
}