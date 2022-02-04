import axios from 'axios'
import { useCookie, defineHandle} from 'h3'
import {decrypt, isValidHttpUrl} from '../../helpers'

export default defineHandle(async(req, res)=>{
    let url = await useCookie(req, 'firebase')
    let password = await useCookie(req, 'ency')
    if(!url || !password){
        res.statusCode = 401
        return {
            statusCode: 401,
            message: 'Invalid url and password'
        }
    }
    url = decrypt(url, Buffer.from(password, 'base64').toString())
    if(!isValidHttpUrl(url)){
        res.statusCode = 401
        return {
            statusCode: 400,
            message: 'Url is not valid',
        }
    }
    let request = await axios.get(url+'/wallet.json')
    let data = request.data
    let wallets = []
    if(data !== null){
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            data[keys[i]].id = keys[i]
            wallets.push(data[keys[i]])
        }
    }
    return {message: 'ok', data: wallets}
})