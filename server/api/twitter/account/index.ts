import { defineHandle, useCookie } from 'h3'

export default defineHandle(async(req, res)=>{
    let accountData = []

    let twitterAccountCookie = await useCookie(req, 'twitter-account')

    if(twitterAccountCookie !== undefined){
        accountData = JSON.parse(twitterAccountCookie).filter(x => !!x)
    }

    return {message: 'ok', account: accountData}
})