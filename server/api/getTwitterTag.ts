import { defineHandle, useCookie } from 'h3'

export default defineHandle(async(req, res)=>{   
    let tag = await useCookie(req, 'twitter-tag')

    return {message: 'ok', tag: tag}
})