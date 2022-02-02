
export const useWalletData = () => useState<any>('walletData', () => useDefaultWalletData().value)

export const useDefaultWalletData = (data = []) => {
    const modal = ref(data)
    return modal
}