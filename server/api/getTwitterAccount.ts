import { defineHandle, useCookie, useBody, setCookie } from 'h3'

export default defineHandle(async(req, res)=>{
    let accountData = []

    let twitterAccountCookie = await useCookie(req, 'twitter-account')

    if(twitterAccountCookie){
        accountData = JSON.parse(twitterAccountCookie)
    }

    return {message: 'ok', account: accountData}
})