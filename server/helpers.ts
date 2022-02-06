import crypto from 'crypto'

export function encrypt(message, key){
    let cipher = crypto.createCipher('aes-256-cbc', key)
    let crypted = cipher.update(message, 'utf-8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
export function decrypt(message, key){
    let decipher = crypto.createDecipher('aes-256-cbc', key)
    let dec = decipher.update(message,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}
export function isValidHttpUrl(string) {
    let url;
    
    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
export function sortObject(obj, key, type='desc'){
    let sortData = obj.sort((a, b) => {
        if(type === 'asc'){
            return a[key] - b[key];
        } else {
            return b[key] - a[key];
        }
    });
    return sortData;
}