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

    let isAddNetwork = false
    if(body.network == '-'){
        isAddNetwork = true
        let dataNetwork = {
            name: body.networkName,
            shortName: body.networkShortName,
            url: body.explorerUrl
        }
        await axios.put(url+'network/' + body.networkId +'.json', dataNetwork)
    }

    let data = {
        id: body.id,
        name: body.name,
        shortName: body.shortName,
        address: body.address,
        network: isAddNetwork ? body.networkName : body.network,
    }
    await axios.put(url+'wallet/' + body.id +'.json', data)
    return {
        message: 'ok'
    }
})