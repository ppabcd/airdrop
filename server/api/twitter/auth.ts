import { defineHandle, useBody} from 'h3'
import {TwitterApi} from 'twitter-api-v2'

export default defineHandle(async(req, res)=>{
    try {
        const client = new TwitterApi({
            appKey: process.env.API_KEY,
            appSecret: process.env.API_SECRET,
        })
        const authLink = await client.generateAuthLink(process.env.CALLBACK_URL);
    
        return {
            message: 'ok',
            authLink: authLink,
        }
    } catch(err){
        res.statusCode = 401
        return {
            message: 'error',
            error: err.message
        }
    }
})