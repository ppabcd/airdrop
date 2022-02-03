import { useCookie, defineHandle, useBody, setCookie} from 'h3'

export default defineHandle(async(req, res)=>{
    let body = await useBody(req)

    let url = await useCookie(req, 'firebase')
    let password = await useCookie(req, 'ency')
    
    let accounts = useCookie(req, 'twitter-account')

    let jsonAccount = JSON.parse(accounts)

    for(let acc in jsonAccount){
        if(jsonAccount[acc].id == body.id){
            delete jsonAccount[acc]
        }
    }

    setCookie(res, 'twitter-account', JSON.stringify(jsonAccount), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })

    return {message: 'ok', accounts: jsonAccount}
})