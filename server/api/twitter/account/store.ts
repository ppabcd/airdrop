import { defineHandle, useCookie, useBody, setCookie } from 'h3'
import {encrypt} from '../../../helpers'
import {TwitterApi} from 'twitter-api-v2'

export default defineHandle(async(req, res)=>{
    let body = await useBody(req)
    let password = await useCookie(req, 'ency')
    
    let decodedPassword = Buffer.from(password, 'base64').toString()
    let accountData = []

    let twitterAccountCookie = await useCookie(req, 'twitter-account')

    if(twitterAccountCookie){
        accountData = JSON.parse(twitterAccountCookie)
    }
    let apiData = {
        apiKey: body.apiKey,
        apiSecret: body.apiSecret,
        accessToken: body.accessToken,
        accessTokenSecret: body.accessTokenSecret
    }

    const client = new TwitterApi({
        appKey: body.apiKey,
        appSecret: body.apiSecret,
        accessToken: body.accessToken,
        accessSecret: body.accessTokenSecret
    })
    try {
        await client.v2.me()
    } catch(err){
        res.statusCode = 401
        return {
            message: 'error',
            error: err.message
        }
    }

    let apiDataString = encrypt(JSON.stringify(apiData), decodedPassword)

    accountData.push({
        id: body.id,
        accountName: body.accountName,
        apiData: apiDataString
    })

    setCookie(res, 'twitter-account', JSON.stringify(accountData.filter(x => !!x)), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })

    return {message: 'ok', account: accountData}
})