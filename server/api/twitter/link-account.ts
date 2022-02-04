import { defineHandle, useBody, useCookie, setCookie} from 'h3'
import {TwitterApi} from 'twitter-api-v2'
import { encrypt } from '~~/server/helpers'

export default defineHandle(async(req, res)=>{
    try {
        let body = await useBody(req)
        let password = await useCookie(req, 'ency')

        let decodedPassword = Buffer.from(password, 'base64').toString()
        let accountData = []

        let twitterAccountCookie = await useCookie(req, 'twitter-account')
        if(twitterAccountCookie){
            accountData = JSON.parse(twitterAccountCookie)
        }

        const client = new TwitterApi({
            appKey: process.env.API_KEY,
            appSecret: process.env.API_SECRET,
            accessToken: body.oauthToken,
            accessSecret: body.oauthSecret,
        })
        
        const { client: loggedClient, accessToken, accessSecret } = await client.login(body.accountPin);
        let apiData = {
            apiKey: '_ENV_',
            apiSecret: '_ENV_',
            accessToken: accessToken,
            accessTokenSecret: accessSecret
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
    } catch(err){
        res.statusCode = 401
        return {
            message: 'error',
            error: err.message
        }
    }
})