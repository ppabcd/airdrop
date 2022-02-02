import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(({ nuxt }) => {
    return {
        provide: {
            inArray: (needle, haystack) => {
                const length = haystack.length
                for (let i = 0; i < length; i++) {
                    if (haystack[i] === needle) return true
                }
                return false
            },
            isValidHttpUrl(string){
                let url;
                
                try {
                    url = new URL(string);
                } catch (_) {
                    return false;  
                }
                return url.protocol === "http:" || url.protocol === "https:";
            },
            copyData(text){
                navigator.clipboard.writeText(String(text))
                alert('You have copied the address')
            },
            getWalletAddress(address){
                return address.substring(0, 7) + '...' + address.slice(address.length - 5)
            },
            randomNumber(min, max) {
                return Math.floor(Math.random() * (max - min) ) + min;
            }
        },
    }
})