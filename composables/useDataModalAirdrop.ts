
export const useDataModalAirdrop = () => useState<string>('dataModalAirdrop', () => useDefaultDataModalAirdrop().value)

export const useDefaultDataModalAirdrop = (data = null) => {
    const modal = ref(data)
    return modal
}