import { defineStore } from 'pinia'
import actions from './actions'
import getters from './getters'
export const globalStore = defineStore('globalStore', {
  state: () => ({
    cartList: []
  }),
  getters,
  actions
})
