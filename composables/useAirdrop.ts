
export const useAirdropData = () => useState<any>('AirdropData', () => useDefaultAirdropData().value)

export const useDefaultAirdropData = (data = []) => {
    const modal = ref(data)
    return modal
}


