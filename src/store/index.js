import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {},
    display: {
      products: localStorage.getItem('display-products')
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
