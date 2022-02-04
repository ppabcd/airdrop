import { defineHandle, useBody, useCookie } from 'h3'
import {TwitterApi} from 'twitter-api-v2'
import { decrypt } from '../../helpers'

interface ApiData {
    apiKey: string,
    apiSecret: string,
    accessToken: string,
    accessTokenSecret: string
}

export default defineHandle(async(req, res)=>{
    try{
        const body = await useBody(req)

        if(!body.tweet){
            res.statusCode = 401
            return {
                message: 'error',
                error: 'Tweet is required'
            }
        }
        
        let password = await useCookie(req, 'ency')
        let decodedPassword = Buffer.from(password, 'base64').toString()
        
        let decryptApiKey = decrypt(body.apiData, decodedPassword)
        let jsonApiKey: ApiData = JSON.parse(decryptApiKey)

        console.log(jsonApiKey)
        
        if(!jsonApiKey.apiKey || !jsonApiKey.apiSecret || !jsonApiKey.accessToken || !jsonApiKey.accessTokenSecret){
            res.statusCode = 401
            return {
                message: 'error',
                error: 'Invalid api data'
            }
        }
        if(jsonApiKey.apiKey == '_ENV_' || jsonApiKey.apiSecret == '_ENV_'){
            jsonApiKey.apiKey = process.env.API_KEY
            jsonApiKey.apiSecret = process.env.API_SECRET
        }

        const client = new TwitterApi({
            appKey: jsonApiKey.apiKey,
            appSecret: jsonApiKey.apiSecret,
            accessToken: jsonApiKey.accessToken,
            accessSecret: jsonApiKey.accessTokenSecret
        })
        
        let my = {
            id: '',
            name: '',
            username: ''
        }

        let responseData = {
            message: 'ok',
            error: []
        }

        try{
            let myData = await client.v2.me()
            my = myData.data
        } catch(err){
            responseData.message = 'error'
            responseData.error['tweet'] = err.message
        }

        try {
            if(body.retweet){
                await client.v1.tweet(body.tweet, {
                    attachment_url: body.retweet
                })    
            } else {
                await client.v1.tweet(body.tweet)
            }
        } catch(err){
            responseData.message = 'error'
            responseData.error['tweet'] = err.message
        }
        
        try {
            if(body.like){
                let checkLike = await client.v2.like(my.id, body.like)
            }
        } catch(err){
            responseData.message = 'error'
            responseData.error['tweet'] = err.message
        }
    
        return responseData
    } catch(err){
        console.error(err)
        return {
            message: 'error',
            error: err
        }
    }
})