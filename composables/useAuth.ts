
export const useAuthModal = () => useState<number>('authModal', () => useDefaultAuthModal().value)

export const useDefaultAuthModal = (isShow=1) => {
    const modal = ref(isShow)
    return modal
}