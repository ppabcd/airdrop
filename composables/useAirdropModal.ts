
export const useAirdropModal = () => useState<number>('showAirdropModal', () => useDefaultAirdropModal().value)

export const useDefaultAirdropModal = (isShow=0) => {
    const modal = ref(isShow)
    modal.value = isShow
    return modal
}