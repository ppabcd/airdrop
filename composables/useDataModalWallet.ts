
export const useDataModalWallet = () => useState<any>('dataModalWallet', () => useDefaultDataModalWallet().value)

export const useDefaultDataModalWallet = (data = {}) => {
    const modal = ref(data)
    return modal
}