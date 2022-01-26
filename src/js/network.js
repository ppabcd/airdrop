async function getNetworks(){
    networks = []
    await axios.get(url+'network.json')
        .then(function(response){
            let data = response.data
            let keys = Object.keys(data)
            for(let i = 0; i < keys.length; i++){
                data[keys[i]].id = keys[i]
                networks.push(data[keys[i]])
            }
        })
        .catch(function(error){
            console.log(error)
        })
    setNetwork()
}
async function deleteNetwork(key){
    axios.delete(url+'network/' + key+'.json')
        .then(function(){
            alert('Network deleted')
            getNetworks()
        })
        .catch(function(error){
            console.log(error)
        })
}

function setNetwork(){
    let selectNetwork = qs('#form-wallet-network')    
    removeOption(selectNetwork)
    let optionNetwork = document.createElement('option')
    optionNetwork.value = ''
    optionNetwork.text = 'Network'
    selectNetwork.add(optionNetwork)
    for(let i = 0; i < networks.length; i++){
        let option = document.createElement('option')
        option.value = networks[i].shortName
        option.innerHTML = networks[i].name
        selectNetwork.appendChild(option)
    }
    let other = document.createElement('option')
    other.value = '-'
    other.innerHTML = 'Other'
    selectNetwork.appendChild(other)

    // Network
    let networkTable = qs("#network-data")
    networkTable.innerHTML = ''
    if(networks.length < 1){
        networkTable.innerHTML = '<tr><td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-center" colspan="6">Network data not available</td></tr>'
        return
    }
    for(let i = 0; i < networks.length; i++){
        let odd = i % 2 == 0? 'bg-gray-50': 'bg-white';
        let network = networks[i]
        let tr = document.createElement('tr')
        tr.classList.add(odd)
        tr.innerHTML = `
                <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">${network.name}</td>
                <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">${network.shortName}</td>
                <td class="px-6 py-5 whitespace-nowrap text-sm font-medium"><a href='${network.url}' class="text-indigo-400" target="_blank">${network.url}</a></td>
                <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <a href="javascript:void(0)" onclick="deleteNetwork('`+ network.id +`')" class="text-red-600 hover:text-indigo-900">Delete</a>
                </td>
        `
        networkTable.appendChild(tr)
    }
}

qs('#form-wallet-network').addEventListener('change', function(){
    let network = qs('#form-wallet-network')
    let networkName = qs('#network-name')
    let explorerUrl = qs('#explorer-url')
    let networkShortName = qs('#network-short-name')
    console.log(network.value)
    if(network.value == '-'){
        networkName.classList.remove('hidden-important')
        networkShortName.classList.remove('hidden-important')
        explorerUrl.classList.remove('hidden-important')
    } else {
        networkName.classList.add('hidden-important')
        networkShortName.classList.add('hidden-important')
        explorerUrl.classList.add('hidden-important')
    }
})