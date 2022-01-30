function qs(query){
    return document.querySelector(query);
}
function qsa(query){
    return document.querySelectorAll(query);
}
function encrypt(message = '', key = ''){
    return CryptoJS.AES.encrypt(message, key).toString();
}
function decrypt(message = '', key = ''){
    return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
}
function isValidHttpUrl(string) {
    let url;
    
    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function toggleModal(id, state=null){
    switch(state){
        case 'open':
            document.querySelector("#" + id).classList.remove('hidden');
            return
        case 'close':
            document.querySelector("#" + id).classList.add('hidden');
            return
        default:
            document.querySelector("#" + id).classList.toggle('hidden');
            return
    }
}
function copyData(address){
    navigator.clipboard.writeText(String(address))
    alert('You have copied the address')
}

function removeOption(selectElement){
    let  i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}
function inArray(
    needle,
    haystack
){
    const length = haystack.length
    for (let i = 0; i < length; i++) {
        if (haystack[i] === needle) return true
    }
    return false
}
function isEmptyObject(obj){
    return obj
        && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype
}
