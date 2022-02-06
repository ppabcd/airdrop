import axios from 'axios'
import { useCookie, defineHandle} from 'h3'
import {decrypt, isValidHttpUrl, sortByKey, sortObject} from '../../helpers'

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
    let data = await axios.get(url+'/airdrop.json')
    for(let key in data.data){
        let newData = {}
        let keys = Object.keys(data.data[key])
        keys.sort()
        keys.reverse()
        for(let i = 0; i < keys.length; i++){
            newData[i+''+keys[i]] = data.data[key][keys[i]]
        }
        data.data[key] = newData
    }
    return {message: 'ok', data: data.data? data.data : {}}
})