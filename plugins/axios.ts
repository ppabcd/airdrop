import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      axios: () => {
        return axios.create({/* configuration here */})
      }
    }
  }
})