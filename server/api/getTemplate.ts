import axios from 'axios'
import { useCookie, defineHandle} from 'h3'
import {decrypt, isValidHttpUrl} from '../helpers'

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
    let request = await axios.get(url+'/template.json')
    let data = request.data
    let templates = []
    if(data !== null){
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            templates.push(data[keys[i]])
        }
    }
    return {message: 'ok', data: templates}
})