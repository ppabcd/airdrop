import { defineHandle, useCookie, useBody } from 'h3'
import {decrypt, isValidHttpUrl} from '../helpers'
import axios from 'axios'

export default defineHandle(async(req, res)=>{
    let url = await useCookie(req, 'firebase')
    let password = await useCookie(req, 'password')
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

    let walletData = body.wallet.split('|')
    let data = {
        id: body.id,
        name: body.name,
        description: body.description,
        type: body.type,
        post: body.post,
        walletName: walletData[0],
        network: walletData[1],
        address: walletData[2],
        walletPlain: body.wallet,
        addOn: body.addOn
    }

    await axios.put(url+'airdrop/' + body.type +'/'+ body.id + '.json', data)
    return {message: 'ok'}
})