import { defineHandle, useCookie, useBody, setCookie } from 'h3'
import {encrypt} from '../helpers'
import {TwitterApi} from 'twitter-api-v2'

export default defineHandle(async(req, res)=>{
    let body = await useBody(req)
    
    setCookie(res, 'twitter-tag', body.tag, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })

    return {message: 'ok', tag: body.tag}
})