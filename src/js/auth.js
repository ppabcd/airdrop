function login(){
    try{
        let password = qs('#password').value;

        if(password == ''){
            alert('Password is required')
            return
        }
        let expired = new Date()
        expired.setMonth(expired.getMonth() + 1)
        expired = expired.getTime()/1000

        if(localStorage.getItem('endpoint-airdrop') == null){
            let endpoint = qs('#firebase-url');
            if(endpoint.value == ''){
                alert('Please enter the Firebase URL')
                return
            }
            if(isValidHttpUrl(endpoint.value) == false){
                alert('Please enter a valid Firebase URL')
                return
            }
            let encryptedEndpoint = encrypt(endpoint.value, password)
            localStorage.setItem('endpoint-airdrop', encryptedEndpoint)
            localStorage.setItem('key-airdrop', btoa(password));
            localStorage.setItem('cache-airdrop-expired', parseInt(expired));
            url = endpoint.value
        } else {
            let endpoint = localStorage.getItem('endpoint-airdrop')
            let decryptData = decrypt(endpoint, password)
            if(!isValidHttpUrl(decryptData)){
                alert("Wrong password")
                return
            }
            if(decryptData.indexOf('firebasedatabase') == -1){
                alert("Please clear cache because the url is not from Firebase")
                return
            }
            localStorage.setItem('key-airdrop', btoa(password));
            localStorage.setItem('cache-airdrop-expired', parseInt(expired));
            url = decryptData
        }
        toggleModal('modalLogin', 'close')
        getNetworks()
        getWallets()
        changeMenu('airdrop')
        // refreshData()
    } catch(error){
        console.log(error);
        alert("Wrong password")
    }
}

function checkAccount(){
    if(localStorage.getItem('endpoint-airdrop') == null){
        return
    }
    qs('#firebase-form').classList.add('hidden')
    if(localStorage.getItem('key-airdrop') == null){
        return
    }
    if(localStorage.getItem('cache-airdrop-expired') == null || parseInt(localStorage.getItem('cache-airdrop-expired')) < new Date().getTime()/1000){
        console.log("Hello")
        localStorage.removeItem('key-airdrop')
        localStorage.removeItem('cache-airdrop-expired')
        return
    }
    let password = localStorage.getItem('key-airdrop');
    let decryptData = decrypt(localStorage.getItem('endpoint-airdrop'), atob(password))
    if(!isValidHttpUrl(decryptData)){
        localStorage.removeItem('key-airdrop');
        localStorage.removeItem('cache-airdrop-expired');
        return
    }
    url = decryptData
    toggleModal('modalLogin', 'close')
    getNetworks()
    getWallets()
    getAirdrop()
    changeMenu('airdrop')
}
checkAccount()
