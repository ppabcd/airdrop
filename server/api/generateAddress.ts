import { setCookie, useBody, defineHandle } from 'h3'
import {encrypt, isValidHttpUrl} from '../helpers'
import { generateMnemonic, EthHdWallet } from 'eth-hd-wallet'


export default defineHandle(async(req, res)=>{
    let mnemonic = generateMnemonic()
    const wallet = EthHdWallet.fromMnemonic(mnemonic)
    wallet.generateAddresses(1)
    return {message: 'ok', address: '0x'+String(wallet.getAddresses()[0]).replace('0x', '').toUpperCase(), mnemonic: mnemonic, privateKey: String(wallet.getPrivateKey(wallet.getAddresses()[0]).toString('hex'))}
})