
export const useWalletData = () => useState<any>('walletData', () => useDefaultWalletData().value)

export const useDefaultWalletData = (data = []) => {
    const modal = ref(data)
    return modal
}


export const useWalletModal = () => useState<number>('showWalletModal', () => useDefaultWalletModal().value)

export const useDefaultWalletModal = (isShow=0) => {
    const modal = ref(isShow)
    modal.value = isShow
    return modal
}


export const useDataModalWallet = () => useState<any>('dataModalWallet', () => useDefaultDataModalWallet().value)

export const useDefaultDataModalWallet = (data = {}) => {
    const modal = ref(data)
    return modal
}