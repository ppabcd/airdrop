
export const useNetworkData = () => useState<any>('NetworkData', () => useDefaultNetworkData().value)

export const useDefaultNetworkData = (data = []) => {
    const modal = ref(data)
    return modal
}