
export const useWalletModal = () => useState<number>('showWalletModal', () => useDefaultWalletModal().value)

export const useDefaultWalletModal = (isShow=0) => {
    const modal = ref(isShow)
    modal.value = isShow
    return modal
}