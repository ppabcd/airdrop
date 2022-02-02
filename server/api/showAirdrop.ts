import axios from 'axios'
import { useCookie, defineHandle, useBody} from 'h3'
import {decrypt, isValidHttpUrl} from '../helpers'

export default defineHandle(async(req, res)=>{
    let url = await useCookie(req, 'firebase')
    let password = await useCookie(req, 'password')
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
    const body = await useBody(req)
    console.log(url+'airdrop/'+body.type+'/'+body.id+'.json')
    let data = await axios.get(url+'airdrop/'+body.type+'/'+body.id+'.json')
    return {message: 'ok', data: data.data?data.data:null}
})