import { setCookie, useBody, defineHandle } from 'h3'
import {encrypt, isValidHttpUrl} from '../../helpers'

export default defineHandle(async(req, res)=>{
    const body = await useBody(req)

    if(!body.url || !body.password){
        res.statusCode = 401
        return {
            statusCode: 401,
            message: 'url and password are required'
        }
    }
    if(!isValidHttpUrl(body.url)){
        res.statusCode = 401
        return {
            statusCode: 400,
            message: 'Url is not valid',
        }
    }
    let url = encrypt(body.url, body.password)
    // 1 year
    setCookie(res, 'firebase', url, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })
    setCookie(res, 'ency', Buffer.from(body.password).toString('base64'), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })
    return {message: 'ok'}
})