import { defineStore } from 'pinia'

export const loadingStore = defineStore('loading', {
 state:() => ({
     isLoading: false,
 }),
 actions:{
     setLoading(isLoading) {
         this.isLoading = isLoading;
     }
 }
})