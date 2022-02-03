import { defineHandle, useCookie, useBody } from 'h3'
import {decrypt, isValidHttpUrl} from '../helpers'
import axios from 'axios'

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
    const body = await useBody(req)

    let data = {
        id: body.id,
        template: body.template
    }

    await axios.put(url+'template/' + body.id + '.json', data)
    return {message: 'ok'}
})