
export const useAirdropData = () => useState<any>('AirdropData', () => useDefaultAirdropData().value)

export const useDefaultAirdropData = (data = []) => {
    const modal = ref(data)
    return modal
}


export const useAirdropModal = () => useState<number>('showAirdropModal', () => useDefaultAirdropModal().value)

export const useDefaultAirdropModal = (isShow=0) => {
    const modal = ref(isShow)
    modal.value = isShow
    return modal
}


export const useDataModalAirdrop = () => useState<string>('dataModalAirdrop', () => useDefaultDataModalAirdrop().value)

export const useDefaultDataModalAirdrop = (data = null) => {
    const modal = ref(data)
    return modal
}