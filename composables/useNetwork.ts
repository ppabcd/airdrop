
export const useNetworkData = () => useState<any>('NetworkData', () => useDefaultNetworkData().value)

export const useDefaultNetworkData = (data = []) => {
    const modal = ref(data)
    return modal
}


export const useNetworkModal = () => useState<number>('showNetworkModal', () => useDefaultNetworkModal().value)

export const useDefaultNetworkModal = (isShow=0) => {
    const modal = ref(isShow)
    modal.value = isShow
    return modal
}