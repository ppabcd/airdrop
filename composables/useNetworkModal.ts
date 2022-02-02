
export const useNetworkModal = () => useState<number>('showNetworkModal', () => useDefaultNetworkModal().value)

export const useDefaultNetworkModal = (isShow=0) => {
    const modal = ref(isShow)
    modal.value = isShow
    return modal
}